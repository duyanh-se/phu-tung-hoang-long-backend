import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import * as argon2 from 'argon2';
import request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';
import { setupApp } from '../src/setup-app';

describe('Manufacturer CRUD (PostgreSQL)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let adminToken: string;
  let userToken: string;
  let manufacturerId: string;
  let emptyId: string;
  let productId: string;
  const prefix = `manufacturer-${randomUUID()}`;
  const emails = [`${prefix}-admin@example.com`, `${prefix}-user@example.com`];
  const base = '/api/v1/manufacturers';
  const http = () => request(app.getHttpServer());
  const admin = () => ({ Authorization: `Bearer ${adminToken}` });

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
          fullName: 'Manufacturer Admin',
          role: 'ADMIN',
        },
        {
          email: emails[1],
          passwordHash,
          fullName: 'Manufacturer User',
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
    if (prisma) {
      await prisma.product.deleteMany({
        where: { code: { startsWith: prefix } },
      });
      await prisma.manufacturer.deleteMany({
        where: { name: { startsWith: prefix } },
      });
      await prisma.user.deleteMany({ where: { email: { in: emails } } });
    }
    if (app) await app.close();
  });

  it('documents public reads, ADMIN writes, typed pagination and deletion message', async () => {
    const { body } = await http().get('/docs-json').expect(200);
    expect(body.paths[base].get.security).toBeUndefined();
    expect(body.paths[base].post.security).toEqual([{ bearer: [] }]);
    for (const name of ['page', 'limit'])
      expect(
        body.paths[base].get.parameters.find(
          (p: { name: string }) => p.name === name,
        ).schema.type,
      ).toBe('integer');
    expect(
      body.paths[`${base}/{id}`].delete.responses['200'].content[
        'application/json'
      ].schema.$ref,
    ).toBe('#/components/schemas/DeleteManufacturerResponseDto');
    expect(body.paths[`${base}/{id}`].delete.responses['409']).toBeDefined();
    expect(
      body.components.schemas.ManufacturerResponseDto.properties.legacyId,
    ).toBeUndefined();
    expect(
      body.components.schemas.UpdateManufacturerDto.required ?? [],
    ).toEqual([]);
  });

  it('allows guest reads and blocks guest/USER on all write routes', async () => {
    await http().get(base).expect(200);
    for (const method of ['post', 'patch', 'delete'] as const) {
      const path = base + (method === 'post' ? '' : `/${randomUUID()}`);
      await http()[method](path).expect(401);
      await http()
        [method](path)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
    }
  });

  it('validates name, UUID, pagination and protects imported metadata', async () => {
    for (const data of [
      {},
      { name: '' },
      { name: ' ' },
      { name: null },
      { name: 12 },
      { name: 'a'.repeat(201) },
      { name: prefix, legacyId: 123 },
      { name: prefix, products: [] },
    ])
      await http().post(base).set(admin()).send(data).expect(400);
    for (const query of [
      { page: 0 },
      { page: 1.5 },
      { limit: 101 },
      { search: 'a'.repeat(201) },
    ])
      await http().get(base).query(query).expect(400);
    await http().get(`${base}/invalid`).expect(400);
  });

  it('creates, paginates, searches and updates names without exposing legacy IDs', async () => {
    const { body } = await http()
      .post(base)
      .set(admin())
      .send({ name: ` ${prefix}-A ` })
      .expect(201);
    manufacturerId = body.id;
    expect(body.name).toBe(`${prefix}-A`);
    expect(body.legacyId).toBeUndefined();
    expect(
      (
        await prisma.manufacturer.findUniqueOrThrow({
          where: { id: manufacturerId },
        })
      ).legacyId,
    ).toBeNull();
    emptyId = (
      await http()
        .post(base)
        .set(admin())
        .send({ name: `${prefix}-B` })
        .expect(201)
    ).body.id;
    const first = (
      await http()
        .get(base)
        .query({ search: prefix.toUpperCase(), page: 1, limit: 1 })
        .expect(200)
    ).body;
    const second = (
      await http()
        .get(base)
        .query({ search: prefix, page: 2, limit: 1 })
        .expect(200)
    ).body;
    expect(first).toMatchObject({ total: 2, page: 1, limit: 1, totalPages: 2 });
    expect(first.data).toHaveLength(1);
    expect(second.data[0].id).not.toBe(first.data[0].id);
    expect(
      (await http().get(base).query({ search: prefix, page: 10 }).expect(200))
        .body.data,
    ).toEqual([]);
    expect(
      (await http().get(`${base}/${manufacturerId}`).expect(200)).body,
    ).toEqual(body);
    await http()
      .patch(`${base}/${manufacturerId}`)
      .set(admin())
      .send({ name: null })
      .expect(400);
    const updated = (
      await http()
        .patch(`${base}/${manufacturerId}`)
        .set(admin())
        .send({ name: ` ${prefix}-Updated ` })
        .expect(200)
    ).body;
    expect(updated.name).toBe(`${prefix}-Updated`);
    expect(
      (
        await http()
          .patch(`${base}/${manufacturerId}`)
          .set(admin())
          .send({})
          .expect(200)
      ).body.name,
    ).toBe(updated.name);
  });

  it('blocks deletion when an active or soft-deleted product refers to the manufacturer', async () => {
    productId = (
      await http()
        .post('/api/v1/products')
        .set(admin())
        .send({ code: prefix, manufacturerId })
        .expect(201)
    ).body.id;
    await http().delete(`${base}/${manufacturerId}`).set(admin()).expect(409);
    expect(
      (await http().get(`/api/v1/products/${productId}`).expect(200)).body
        .manufacturer.name,
    ).toBe(`${prefix}-Updated`);
    await http()
      .delete(`/api/v1/products/${productId}`)
      .set(admin())
      .expect(200, { message: 'delete success' });
    await http().delete(`${base}/${manufacturerId}`).set(admin()).expect(409);
    expect(
      (await prisma.product.findUniqueOrThrow({ where: { id: productId } }))
        .manufacturerId,
    ).toBe(manufacturerId);
    // Check the DB invariant as well, so bypassing the API cannot silently unlink products.
    await expect(
      prisma.manufacturer.delete({ where: { id: manufacturerId } }),
    ).rejects.toMatchObject({ code: 'P2003' });
    await http().get(`${base}/${manufacturerId}`).expect(200);
  });

  it('deletes an empty manufacturer with a success message and returns 404 afterward', async () => {
    await http()
      .delete(`${base}/${emptyId}`)
      .set(admin())
      .expect(200, { message: 'delete success' });
    expect(
      await prisma.manufacturer.findUnique({ where: { id: emptyId } }),
    ).toBeNull();
    await http().get(`${base}/${emptyId}`).expect(404);
    await http()
      .patch(`${base}/${emptyId}`)
      .set(admin())
      .send({ name: prefix })
      .expect(404);
    await http().delete(`${base}/${emptyId}`).set(admin()).expect(404);
  });
});
