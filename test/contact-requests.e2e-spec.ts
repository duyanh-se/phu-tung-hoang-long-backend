import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import * as argon2 from 'argon2';
import request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';
import { setupApp } from '../src/setup-app';

describe('Contact request CRUD (PostgreSQL)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let adminToken: string;
  let userToken: string;
  let id: string;
  const prefix = `contact-${randomUUID()}`;
  const emails = [`${prefix}-admin@example.com`, `${prefix}-user@example.com`];
  const guestEmail = `${prefix}-guest@example.com`;
  const base = '/api/v1/contact-requests';
  const http = () => request(app.getHttpServer());
  const admin = () => ({ Authorization: `Bearer ${adminToken}` });
  const valid = {
    fullName: `${prefix} Guest`,
    email: guestEmail,
    phoneNumber: '0901234567',
  };

  beforeAll(async () => {
    const url = process.env.TEST_DATABASE_URL;
    if (!url || !new URL(url).pathname.endsWith('_test'))
      throw new Error('Use a dedicated TEST_DATABASE_URL ending with _test');
    process.env.DATABASE_URL = url;
    process.env.NODE_ENV = 'test';
    process.env.SWAGGER_ENABLED = 'true';
    process.env.JWT_ACCESS_SECRET = 'test-only-secret-'.repeat(4);
    const { AppModule } = await import('../src/app.module');
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    setupApp(app);
    await app.init();
    prisma = app.get(PrismaService);
    const password = 'TestPassword123!';
    const passwordHash = await argon2.hash(password);
    await prisma.user.createMany({
      data: [
        {
          email: emails[0],
          passwordHash,
          fullName: 'Contact Admin',
          role: 'ADMIN',
        },
        {
          email: emails[1],
          passwordHash,
          fullName: 'Contact User',
          role: 'USER',
        },
      ],
    });
    adminToken = (
      await http()
        .post('/api/v1/auth/login')
        .send({ email: emails[0], password })
        .expect(200)
    ).body.accessToken;
    userToken = (
      await http()
        .post('/api/v1/auth/login')
        .send({ email: emails[1], password })
        .expect(200)
    ).body.accessToken;
  });

  afterAll(async () => {
    try {
      if (prisma) {
        await prisma.contactRequest.deleteMany({
          where: { email: guestEmail },
        });
        await prisma.user.deleteMany({ where: { email: { in: emails } } });
      }
    } finally {
      if (app) await app.close();
    }
  });

  it('documents public submission, private management, required fields and primitive pagination', async () => {
    const { body } = await http().get('/docs-json').expect(200);
    expect(body.paths[base].post.security).toBeUndefined();
    expect(body.paths[base].get.security).toEqual([{ bearer: [] }]);
    for (const method of ['get', 'patch', 'delete'])
      expect(body.paths[`${base}/{id}`][method].security).toEqual([
        { bearer: [] },
      ]);
    expect(body.components.schemas.CreateContactRequestDto.required).toEqual([
      'fullName',
      'email',
      'phoneNumber',
    ]);
    expect(
      body.components.schemas.CreateContactRequestDto.properties.status,
    ).toBeUndefined();
    expect(
      body.components.schemas.UpdateContactRequestDto.required ?? [],
    ).toEqual([]);
    expect(body.components.schemas.ContactRequestStatus.enum).toEqual([
      'NEW',
      'IN_PROGRESS',
      'RESOLVED',
    ]);
    for (const name of ['page', 'limit'])
      expect(
        body.paths[base].get.parameters.find(
          (p: { name: string }) => p.name === name,
        ).schema.type,
      ).toBe('integer');
    expect(body.paths[`${base}/{id}`].delete.responses['200']).toBeDefined();
  });

  it('rejects malformed data and attempts to set internal fields at submission', async () => {
    for (const payload of [
      {},
      { ...valid, fullName: '   ' },
      { ...valid, fullName: null },
      { ...valid, fullName: 'a'.repeat(101) },
      { ...valid, email: 'not-an-email' },
      { ...valid, email: null },
      { ...valid, phoneNumber: 901234567 },
      { ...valid, phoneNumber: 'abc1234567' },
      { ...valid, phoneNumber: '123456' },
      { ...valid, phoneNumber: '1'.repeat(16) },
      { ...valid, phoneNumber: null },
      { ...valid, reason: 123 },
      { ...valid, reason: 'a'.repeat(201) },
      { ...valid, status: 'RESOLVED' },
      { ...valid, userId: randomUUID() },
      { ...valid, id: randomUUID() },
    ])
      await http().post(base).send(payload).expect(400);
    expect(
      await prisma.contactRequest.count({ where: { email: guestEmail } }),
    ).toBe(0);
  });

  it('accepts guests, normalizes input and stores NEW without creating a user', async () => {
    const { body } = await http()
      .post(base)
      .send({
        ...valid,
        fullName: ` ${valid.fullName} `,
        email: ` ${guestEmail.toUpperCase()} `,
        phoneNumber: '090 123-4567',
        reason: ' Tư vấn sản phẩm ',
      })
      .expect(201);
    id = body.id;
    expect(body).toMatchObject({
      ...valid,
      reason: 'Tư vấn sản phẩm',
      status: 'NEW',
    });
    expect(body.createdAt).toEqual(expect.any(String));
    expect(
      await prisma.contactRequest.findUniqueOrThrow({ where: { id } }),
    ).toMatchObject({ ...valid, status: 'NEW' });
    expect(
      await prisma.user.findUnique({ where: { email: guestEmail } }),
    ).toBeNull();
  });

  it('blocks guests and USER from listing, reading, updating and deleting contact data', async () => {
    for (const [method, path] of [
      ['get', base],
      ['get', `${base}/${id}`],
      ['patch', `${base}/${id}`],
      ['delete', `${base}/${id}`],
    ] as const) {
      await http()[method](path).expect(401);
      await http()
        [method](path)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
    }
    expect(
      (await prisma.contactRequest.findUniqueOrThrow({ where: { id } })).status,
    ).toBe('NEW');
  });

  it('accepts optional reasons and repeated contact information without linking accounts', async () => {
    for (const reason of [undefined, null, '   ']) {
      const { body } = await http()
        .post(base)
        .send({ ...valid, reason })
        .expect(201);
      expect(body.reason).toBeNull();
      expect(body.id).not.toBe(id);
    }
    const { body } = await http()
      .post(base)
      .set('Authorization', `Bearer ${userToken}`)
      .send(valid)
      .expect(201);
    expect(body.status).toBe('NEW');
  });

  it('lets ADMIN read, edit contact fields and set all three statuses', async () => {
    expect(
      (await http().get(`${base}/${id}`).set(admin()).expect(200)).body.id,
    ).toBe(id);
    const { body } = await http()
      .patch(`${base}/${id}`)
      .set(admin())
      .send({
        fullName: `${prefix} Updated`,
        email: ` ${guestEmail.toUpperCase()} `,
        phoneNumber: '+84 (90) 123-4567',
        status: 'IN_PROGRESS',
      })
      .expect(200);
    expect(body).toMatchObject({
      fullName: `${prefix} Updated`,
      email: guestEmail,
      phoneNumber: '+84901234567',
      status: 'IN_PROGRESS',
      reason: 'Tư vấn sản phẩm',
    });
    for (const status of ['RESOLVED', 'NEW', 'IN_PROGRESS']) {
      expect(
        (
          await http()
            .patch(`${base}/${id}`)
            .set(admin())
            .send({ status })
            .expect(200)
        ).body.status,
      ).toBe(status);
    }
    expect(
      (
        await http()
          .patch(`${base}/${id}`)
          .set(admin())
          .send({ reason: null })
          .expect(200)
      ).body.reason,
    ).toBeNull();
    expect(
      (
        await http()
          .patch(`${base}/${id}`)
          .set(admin())
          .send({ reason: ' Tư vấn ' })
          .expect(200)
      ).body.reason,
    ).toBe('Tư vấn');
    expect(
      (
        await http()
          .patch(`${base}/${id}`)
          .set(admin())
          .send({ reason: '' })
          .expect(200)
      ).body.reason,
    ).toBeNull();
    expect(
      (await http().patch(`${base}/${id}`).set(admin()).send({}).expect(200))
        .body.status,
    ).toBe('IN_PROGRESS');
  });

  it('paginates and searches names/email/phone with combined status filtering', async () => {
    const first = (
      await http()
        .get(base)
        .set(admin())
        .query({ search: prefix.toUpperCase(), page: 1, limit: 2 })
        .expect(200)
    ).body;
    const second = (
      await http()
        .get(base)
        .set(admin())
        .query({ search: prefix, page: 2, limit: 2 })
        .expect(200)
    ).body;
    expect(first).toMatchObject({ total: 5, page: 1, limit: 2, totalPages: 3 });
    expect(first.data).toHaveLength(2);
    expect(
      second.data.every(
        (item: { id: string }) =>
          !first.data.some((other: { id: string }) => other.id === item.id),
      ),
    ).toBe(true);
    for (const search of [
      guestEmail.toUpperCase(),
      `${prefix} Updated`,
      '+84901234567',
    ]) {
      const { body } = await http()
        .get(base)
        .set(admin())
        .query({ search, status: 'IN_PROGRESS' })
        .expect(200);
      expect(body.total).toBe(1);
      expect(body.data[0].id).toBe(id);
    }
    expect(
      (
        await http()
          .get(base)
          .set(admin())
          .query({ search: prefix, page: 10 })
          .expect(200)
      ).body.data,
    ).toEqual([]);
    expect(
      (
        await http()
          .get(base)
          .set(admin())
          .query({ search: prefix, status: 'RESOLVED' })
          .expect(200)
      ).body,
    ).toMatchObject({ data: [], total: 0, totalPages: 0 });
  });

  it('rejects invalid updates, status, UUID and pagination without altering data', async () => {
    for (const payload of [
      { fullName: null },
      { fullName: ' ' },
      { email: null },
      { email: 'invalid' },
      { phoneNumber: null },
      { phoneNumber: 'abc' },
      { status: null },
      { status: 'INVALID' },
      { reason: [] },
      { createdAt: new Date().toISOString() },
    ])
      await http()
        .patch(`${base}/${id}`)
        .set(admin())
        .send(payload)
        .expect(400);
    for (const query of [
      { page: 0 },
      { page: 1.5 },
      { limit: 101 },
      { status: 'INVALID' },
      { search: 'a'.repeat(255) },
    ])
      await http().get(base).set(admin()).query(query).expect(400);
    for (const method of ['get', 'patch', 'delete'] as const)
      await http()[method](`${base}/invalid`).set(admin()).expect(400);
    expect(
      (await prisma.contactRequest.findUniqueOrThrow({ where: { id } })).status,
    ).toBe('IN_PROGRESS');
  });

  it('hard-deletes with a success message, then consistently returns 404', async () => {
    await http()
      .delete(`${base}/${id}`)
      .set(admin())
      .expect(200, { message: 'delete success' });
    expect(
      await prisma.contactRequest.findUnique({ where: { id } }),
    ).toBeNull();
    await http().get(`${base}/${id}`).set(admin()).expect(404);
    await http()
      .patch(`${base}/${id}`)
      .set(admin())
      .send({ status: 'RESOLVED' })
      .expect(404);
    await http().delete(`${base}/${id}`).set(admin()).expect(404);
  });
});
