import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';
import * as argon2 from 'argon2';
import request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';
import { setupApp } from '../src/setup-app';

describe('Authentication and authorization (PostgreSQL)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userId: string;
  let adminId: string;
  let accessToken: string;
  let refreshToken: string;
  let adminToken: string;
  const suffix = randomUUID();
  const email = `customer-${suffix}@example.com`;
  const adminEmail = `admin-${suffix}@example.com`;
  const password = 'StrongPassword123!';
  const api = '/api/v1';

  beforeAll(async () => {
    if (!process.env.TEST_DATABASE_URL)
      throw new Error(
        'Set TEST_DATABASE_URL to a migrated, dedicated PostgreSQL test database.',
      );
    if (!new URL(process.env.TEST_DATABASE_URL).pathname.endsWith('_test'))
      throw new Error('Test database name must end with _test.');
    process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
    process.env.JWT_ACCESS_SECRET = 'test-only-secret-'.repeat(4);
    process.env.NODE_ENV = 'test';
    process.env.SWAGGER_ENABLED = 'true';
    const { AppModule } = await import('../src/app.module');
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    setupApp(app);
    await app.init();
    prisma = app.get(PrismaService);
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        fullName: 'Test Admin',
        passwordHash: await argon2.hash(password),
        role: 'ADMIN',
      },
    });
    adminId = admin.id;
  });
  afterAll(async () => {
    if (prisma)
      await prisma.user.deleteMany({
        where: { email: { in: [email, adminEmail] } },
      });
    if (app) await app.close();
  });

  it('serves health and documents request/response DTOs and bearer security', async () => {
    await request(app.getHttpServer())
      .get(`${api}/health`)
      .expect(200, { status: 'ok' });
    const { body } = await request(app.getHttpServer())
      .get('/docs-json')
      .expect(200);
    expect(body.components.schemas.RegisterDto.required).toEqual(
      expect.arrayContaining(['email', 'password', 'fullName']),
    );
    expect(body.components.schemas.UpdateProfileDto.required ?? []).toEqual([]);
    expect(
      body.components.schemas.UserResponseDto.properties.passwordHash,
    ).toBeUndefined();
    expect(body.paths[`${api}/auth/me`].get.security).toEqual([{ bearer: [] }]);
    expect(body.paths[`${api}/auth/login`].post.security).toBeUndefined();
    await request(app.getHttpServer()).get('/docs').expect(200);
  });
  it('rejects extra fields including role during registration', async () => {
    await request(app.getHttpServer())
      .post(`${api}/auth/register`)
      .send({ email, password, fullName: 'Test User', role: 'ADMIN' })
      .expect(400);
  });
  it('rejects invalid email and weak passwords', async () => {
    await request(app.getHttpServer())
      .post(`${api}/auth/register`)
      .send({ email: 'invalid', password: '123', fullName: 'A' })
      .expect(400);
  });
  it('registers a USER, normalizes email and never returns hashes', async () => {
    const { body } = await request(app.getHttpServer())
      .post(`${api}/auth/register`)
      .send({
        email: ` ${email.toUpperCase()} `,
        password,
        fullName: ' Test User ',
      })
      .expect(201);
    expect(body.user).toMatchObject({
      email,
      fullName: 'Test User',
      role: 'USER',
    });
    expect(body.user.passwordHash).toBeUndefined();
    userId = body.user.id;
    accessToken = body.accessToken;
    refreshToken = body.refreshToken;
    const saved = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: { sessions: true },
    });
    expect(saved.passwordHash).toMatch(/^\$argon2id\$/);
    expect(saved.sessions[0].refreshTokenHash).not.toBe(refreshToken);
  });
  it('rejects duplicate normalized emails', async () => {
    await request(app.getHttpServer())
      .post(`${api}/auth/register`)
      .send({
        email: email.toUpperCase(),
        password,
        fullName: 'Duplicate User',
      })
      .expect(409);
  });
  it('rejects missing, malformed, forged and expired access tokens', async () => {
    await request(app.getHttpServer()).get(`${api}/auth/me`).expect(401);
    await request(app.getHttpServer())
      .get(`${api}/auth/me`)
      .auth('invalid', { type: 'bearer' })
      .expect(401);
    const jwt = app.get(JwtService);
    const claims = jwt.decode<{ sub: string; sid: string }>(accessToken);
    const expired = jwt.sign(
      { sub: claims.sub, sid: claims.sid },
      { expiresIn: -1 },
    );
    await request(app.getHttpServer())
      .get(`${api}/auth/me`)
      .auth(expired, { type: 'bearer' })
      .expect(401);
    const forged = jwt.sign(
      { sub: claims.sub, sid: claims.sid },
      { secret: 'wrong-secret' },
    );
    await request(app.getHttpServer())
      .get(`${api}/auth/me`)
      .auth(forged, { type: 'bearer' })
      .expect(401);
  });
  it('reads and updates own profile, rejects null and role injection', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`${api}/auth/me`)
      .auth(accessToken, { type: 'bearer' })
      .expect(200);
    expect(body.id).toBe(userId);
    expect(body.sessionId).toBeUndefined();
    await request(app.getHttpServer())
      .patch(`${api}/users/me`)
      .auth(accessToken, { type: 'bearer' })
      .send({ fullName: null })
      .expect(400);
    await request(app.getHttpServer())
      .patch(`${api}/users/me`)
      .auth(accessToken, { type: 'bearer' })
      .send({ role: 'ADMIN' })
      .expect(400);
    const updated = await request(app.getHttpServer())
      .patch(`${api}/users/me`)
      .auth(accessToken, { type: 'bearer' })
      .send({ fullName: 'Updated User' })
      .expect(200);
    expect(updated.body.fullName).toBe('Updated User');
  });
  it('blocks USER access to admin endpoints', async () => {
    await request(app.getHttpServer())
      .get(`${api}/users`)
      .auth(accessToken, { type: 'bearer' })
      .expect(403);
    await request(app.getHttpServer())
      .get(`${api}/users/${adminId}`)
      .auth(accessToken, { type: 'bearer' })
      .expect(403);
    await request(app.getHttpServer())
      .patch(`${api}/users/${userId}/role`)
      .auth(accessToken, { type: 'bearer' })
      .send({ role: 'ADMIN' })
      .expect(403);
  });
  it('uses the same error for unknown email and wrong password', async () => {
    const wrong = await request(app.getHttpServer())
      .post(`${api}/auth/login`)
      .send({ email, password: 'WrongPassword1' })
      .expect(401);
    const unknown = await request(app.getHttpServer())
      .post(`${api}/auth/login`)
      .send({ email: 'unknown@example.com', password })
      .expect(401);
    expect(wrong.body).toEqual(unknown.body);
  });
  it('logs in ADMIN and paginates users without exposing credentials', async () => {
    const loggedIn = await request(app.getHttpServer())
      .post(`${api}/auth/login`)
      .send({ email: adminEmail, password })
      .expect(200);
    adminToken = loggedIn.body.accessToken;
    const { body } = await request(app.getHttpServer())
      .get(`${api}/users?page=1&limit=1`)
      .auth(adminToken, { type: 'bearer' })
      .expect(200);
    expect(body.data).toHaveLength(1);
    expect(body.limit).toBe(1);
    expect(body.total).toBeGreaterThanOrEqual(2);
    expect(body.data[0].passwordHash).toBeUndefined();
    await request(app.getHttpServer())
      .get(`${api}/users?limit=101`)
      .auth(adminToken, { type: 'bearer' })
      .expect(400);
    await request(app.getHttpServer())
      .get(`${api}/users/not-uuid`)
      .auth(adminToken, { type: 'bearer' })
      .expect(400);
    await request(app.getHttpServer())
      .get(`${api}/users/${randomUUID()}`)
      .auth(adminToken, { type: 'bearer' })
      .expect(404);
  });
  it('applies role changes immediately to existing access tokens', async () => {
    await request(app.getHttpServer())
      .patch(`${api}/users/${userId}/role`)
      .auth(adminToken, { type: 'bearer' })
      .send({ role: 'ADMIN' })
      .expect(200);
    await request(app.getHttpServer())
      .get(`${api}/users`)
      .auth(accessToken, { type: 'bearer' })
      .expect(200);
    await request(app.getHttpServer())
      .patch(`${api}/users/${userId}/role`)
      .auth(adminToken, { type: 'bearer' })
      .send({ role: 'USER' })
      .expect(200);
    await request(app.getHttpServer())
      .get(`${api}/users`)
      .auth(accessToken, { type: 'bearer' })
      .expect(403);
    await request(app.getHttpServer())
      .patch(`${api}/users/${adminId}/role`)
      .auth(adminToken, { type: 'bearer' })
      .send({ role: 'USER' })
      .expect(400);
  });
  it('rotates refresh tokens and rejects reuse, including concurrent requests', async () => {
    const old = refreshToken;
    const results = await Promise.all(
      [1, 2].map(() =>
        request(app.getHttpServer())
          .post(`${api}/auth/refresh`)
          .send({ refreshToken: old }),
      ),
    );
    expect(results.map((result) => result.status).sort()).toEqual([200, 401]);
    const success = results.find((result) => result.status === 200)!;
    refreshToken = success.body.refreshToken;
    accessToken = success.body.accessToken;
    expect(refreshToken).not.toBe(old);
    await request(app.getHttpServer())
      .post(`${api}/auth/refresh`)
      .send({ refreshToken: old })
      .expect(401);
  });
  it('logs out, invalidates both tokens and preserves another session', async () => {
    const second = await request(app.getHttpServer())
      .post(`${api}/auth/login`)
      .send({ email, password })
      .expect(200);
    await request(app.getHttpServer())
      .post(`${api}/auth/logout`)
      .auth(accessToken, { type: 'bearer' })
      .expect(204);
    await request(app.getHttpServer())
      .get(`${api}/auth/me`)
      .auth(accessToken, { type: 'bearer' })
      .expect(401);
    await request(app.getHttpServer())
      .post(`${api}/auth/refresh`)
      .send({ refreshToken })
      .expect(401);
    await request(app.getHttpServer())
      .get(`${api}/auth/me`)
      .auth(second.body.accessToken, { type: 'bearer' })
      .expect(200);
    const { sid } = app
      .get(JwtService)
      .decode<{ sid: string }>(second.body.accessToken);
    await prisma.session.update({
      where: { id: sid },
      data: { expiresAt: new Date(0) },
    });
    await request(app.getHttpServer())
      .get(`${api}/auth/me`)
      .auth(second.body.accessToken, { type: 'bearer' })
      .expect(401);
    await request(app.getHttpServer())
      .post(`${api}/auth/refresh`)
      .send({ refreshToken: second.body.refreshToken })
      .expect(401);
  });
  it('rate limits repeated login requests', async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 11; i++) {
      const response = await request(app.getHttpServer())
        .post(`${api}/auth/login`)
        .send({ email: 'invalid', password: '' });
      statuses.push(response.status);
    }
    expect(statuses).toContain(429);
  });
});
