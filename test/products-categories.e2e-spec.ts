import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import * as argon2 from 'argon2';
import request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';
import { setupApp } from '../src/setup-app';

describe('Products and flat categories (PostgreSQL)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let adminToken: string;
  let userToken: string;
  let productId: string;
  let categoryA: string;
  let categoryB: string;
  let manufacturerId: string;
  const prefix = `crud-${randomUUID()}`;
  const api = '/api/v1';
  const password = 'TestPassword123!';
  const adminEmail = `${prefix}-admin@example.com`;
  const userEmail = `${prefix}-user@example.com`;
  const http = () => request(app.getHttpServer());
  const admin = () => ({ Authorization: `Bearer ${adminToken}` });

  beforeAll(async () => {
    const url = process.env.TEST_DATABASE_URL;
    if (!url || !new URL(url).pathname.endsWith('_test'))
      throw new Error('Use a dedicated TEST_DATABASE_URL ending with _test');
    process.env.DATABASE_URL = url;
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
    const passwordHash = await argon2.hash(password);
    await prisma.user.createMany({
      data: [
        {
          email: adminEmail,
          passwordHash,
          fullName: 'CRUD Admin',
          role: 'ADMIN',
        },
        { email: userEmail, passwordHash, fullName: 'CRUD User', role: 'USER' },
      ],
    });
    adminToken = (
      await http()
        .post(`${api}/auth/login`)
        .send({ email: adminEmail, password })
        .expect(200)
    ).body.accessToken;
    userToken = (
      await http()
        .post(`${api}/auth/login`)
        .send({ email: userEmail, password })
        .expect(200)
    ).body.accessToken;
    manufacturerId = (
      await prisma.manufacturer.create({ data: { name: prefix } })
    ).id;
  });

  afterAll(async () => {
    if (prisma) {
      await prisma.product.deleteMany({
        where: { code: { startsWith: prefix } },
      });
      await prisma.category.deleteMany({
        where: { name: { startsWith: prefix } },
      });
      if (manufacturerId)
        await prisma.manufacturer.delete({ where: { id: manufacturerId } });
      await prisma.user.deleteMany({
        where: { email: { in: [adminEmail, userEmail] } },
      });
    }
    if (app) await app.close();
  });

  it('documents integer pagination, nullable price and public/admin security', async () => {
    const { body } = await http().get('/docs-json').expect(200);
    for (const resource of ['products', 'categories']) {
      const route = body.paths[`${api}/${resource}`];
      expect(route.get.security).toBeUndefined();
      expect(route.post.security).toEqual([{ bearer: [] }]);
      for (const name of ['page', 'limit'])
        expect(
          route.get.parameters.find((p: { name: string }) => p.name === name)
            .schema.type,
        ).toBe('integer');
      expect(body.paths[`${api}/${resource}/{id}`].patch.security).toEqual([
        { bearer: [] },
      ]);
    }
    expect(
      body.components.schemas.ProductResponseDto.properties.price,
    ).toMatchObject({ type: 'string', nullable: true });
    expect(
      body.components.schemas.CreateProductDto.properties.categoryIds,
    ).toMatchObject({
      type: 'array',
      items: { type: 'string', format: 'uuid' },
    });
    expect(body.components.schemas.UpdateProductDto.required ?? []).toEqual([]);
    const deleteResponses = body.paths[`${api}/products/{id}`].delete.responses;
    expect(deleteResponses['204']).toBeUndefined();
    expect(deleteResponses['200'].content['application/json'].schema.$ref).toBe(
      '#/components/schemas/DeleteProductResponseDto',
    );
    expect(
      body.components.schemas.ProductResponseDto.properties.imageUrl,
    ).toMatchObject({
      type: 'string',
      format: 'uri',
      nullable: true,
      readOnly: true,
    });
  });

  it('allows guest reads and rejects every write for guest and USER', async () => {
    for (const resource of ['products', 'categories']) {
      await http().get(`${api}/${resource}`).expect(200);
      for (const method of ['post', 'patch', 'delete'] as const) {
        const url = `${api}/${resource}${method === 'post' ? '' : `/${randomUUID()}`}`;
        await http()[method](url).expect(401);
        await http()
          [method](url)
          .set('Authorization', `Bearer ${userToken}`)
          .expect(403);
      }
    }
  });

  it('creates flat categories, trims input, paginates, reads and updates', async () => {
    categoryA = (
      await http()
        .post(`${api}/categories`)
        .set(admin())
        .send({ name: ` ${prefix}-A `, description: ' ' })
        .expect(201)
    ).body.id;
    categoryB = (
      await http()
        .post(`${api}/categories`)
        .set(admin())
        .send({ name: `${prefix}-B` })
        .expect(201)
    ).body.id;
    const { body } = await http()
      .get(`${api}/categories`)
      .query({ search: prefix, page: 2, limit: 1 })
      .expect(200);
    expect(body).toMatchObject({ total: 2, page: 2, limit: 1, totalPages: 2 });
    expect(body.data).toHaveLength(1);
    expect(
      (await http().get(`${api}/categories/${categoryA}`).expect(200)).body,
    ).toMatchObject({ name: `${prefix}-A`, description: null });
    expect(
      (
        await http()
          .patch(`${api}/categories/${categoryA}`)
          .set(admin())
          .send({ description: ' Phụ tùng ' })
          .expect(200)
      ).body.description,
    ).toBe('Phụ tùng');
    for (const data of [
      { name: '' },
      { name: null },
      { name: 'Valid', parentId: categoryA },
    ])
      await http()
        .post(`${api}/categories`)
        .set(admin())
        .send(data)
        .expect(400);
    await http()
      .patch(`${api}/categories/${categoryA}`)
      .set(admin())
      .send({ name: null })
      .expect(400);
  });

  it('creates a product with two categories and precise nullable response fields', async () => {
    const { body } = await http()
      .post(`${api}/products`)
      .set(admin())
      .send({
        code: ` ${prefix}-001 `,
        name: ' ',
        price: 49140.12,
        imagePath: '1744694197.jpg',
        manufacturerId,
        categoryIds: [categoryA, categoryB],
      })
      .expect(201);
    productId = body.id;
    expect(body).toMatchObject({
      code: `${prefix}-001`,
      name: null,
      price: '49140.12',
      currency: 'VND',
      description: null,
      imagePath: '1744694197.jpg',
      imageUrl:
        'https://tvthanh.name.vn/public/templates/uploads/1744694197.jpg',
      manufacturer: { id: manufacturerId, name: prefix },
    });
    expect(body.categories.map((c: { id: string }) => c.id).sort()).toEqual(
      [categoryA, categoryB].sort(),
    );
    expect(body.legacyId).toBeUndefined();
    expect(body.deletedAt).toBeUndefined();
    expect(
      (await http().get(`${api}/products/${productId}`).expect(200)).body,
    ).toEqual(body);
  });

  it('rejects invalid values and missing references without inserting partial products', async () => {
    for (const invalid of [
      { code: '' },
      { code: null },
      { price: -1 },
      { price: '100' },
      { price: 1.234 },
      { price: 1000000000000 },
      { categoryIds: null },
      { categoryIds: [categoryA, categoryA] },
      { categoryIds: [randomUUID()] },
      { manufacturerId: randomUUID() },
      { deletedAt: null },
      { currency: 'USD' },
      { legacyId: 1 },
    ])
      await http()
        .post(`${api}/products`)
        .set(admin())
        .send({ code: `${prefix}-invalid`, ...invalid })
        .expect(400);
    expect(
      await prisma.product.count({ where: { code: `${prefix}-invalid` } }),
    ).toBe(0);
    await http()
      .post(`${api}/products`)
      .set(admin())
      .send({ code: `${prefix}-001` })
      .expect(409);
    await http()
      .patch(`${api}/products/${productId}`)
      .set(admin())
      .send({ code: null })
      .expect(400);
    await http()
      .patch(`${api}/products/${productId}`)
      .set(admin())
      .send({ categoryIds: null })
      .expect(400);
  });

  it('normalizes unknown price, supports empty names and filters consistently', async () => {
    const { body } = await http()
      .post(`${api}/products`)
      .set(admin())
      .send({ code: `${prefix}-002`, price: 0 })
      .expect(201);
    expect(body).toMatchObject({
      name: null,
      price: null,
      manufacturer: null,
      manufacturerId: null,
      categories: [],
    });
    const page1 = (
      await http()
        .get(`${api}/products`)
        .query({ search: prefix.toUpperCase(), limit: 1 })
        .expect(200)
    ).body;
    const page2 = (
      await http()
        .get(`${api}/products`)
        .query({ search: prefix, page: 2, limit: 1 })
        .expect(200)
    ).body;
    expect(page1).toMatchObject({ total: 2, page: 1, limit: 1, totalPages: 2 });
    expect(page1.data[0].id).not.toBe(page2.data[0].id);
    const filtered = (
      await http()
        .get(`${api}/products`)
        .query({ search: prefix, categoryId: categoryA, manufacturerId })
        .expect(200)
    ).body;
    expect(filtered.total).toBe(1);
    expect(filtered.data[0].id).toBe(productId);
    expect(filtered.data[0].imageUrl).toBe(
      'https://tvthanh.name.vn/public/templates/uploads/1744694197.jpg',
    );
    expect(
      (
        await http()
          .get(`${api}/products`)
          .query({ search: prefix, page: 10 })
          .expect(200)
      ).body.data,
    ).toEqual([]);
    for (const resource of ['products', 'categories']) {
      await http().get(`${api}/${resource}`).query({ page: 0 }).expect(400);
      await http().get(`${api}/${resource}`).query({ limit: 101 }).expect(400);
      await http().get(`${api}/${resource}/invalid`).expect(400);
      await http().get(`${api}/${resource}/${randomUUID()}`).expect(404);
    }
  });

  it('preserves omitted categories, replaces explicit arrays and rolls back invalid updates', async () => {
    const updated = (
      await http()
        .patch(`${api}/products/${productId}`)
        .set(admin())
        .send({ name: ' Updated ', price: null, description: ' Details ' })
        .expect(200)
    ).body;
    expect(updated).toMatchObject({
      name: 'Updated',
      price: null,
      description: 'Details',
    });
    expect(updated.categories).toHaveLength(2);
    await http()
      .patch(`${api}/products/${productId}`)
      .set(admin())
      .send({ name: 'Must rollback', categoryIds: [randomUUID()] })
      .expect(400);
    expect(
      (await http().get(`${api}/products/${productId}`).expect(200)).body,
    ).toEqual(updated);
    const replaced = (
      await http()
        .patch(`${api}/products/${productId}`)
        .set(admin())
        .send({ categoryIds: [categoryB] })
        .expect(200)
    ).body;
    expect(replaced.categories.map((c: { id: string }) => c.id)).toEqual([
      categoryB,
    ]);
    const cleared = (
      await http()
        .patch(`${api}/products/${productId}`)
        .set(admin())
        .send({ categoryIds: [], manufacturerId: null, imagePath: ' ' })
        .expect(200)
    ).body;
    expect(cleared).toMatchObject({
      categories: [],
      manufacturer: null,
      imagePath: null,
      imageUrl: null,
    });
    await http()
      .patch(`${api}/products/${productId}`)
      .set(admin())
      .send({ categoryIds: [categoryB] })
      .expect(200);
  });

  it('blocks deleting a linked category and only removes an empty category', async () => {
    await http()
      .delete(`${api}/categories/${categoryB}`)
      .set(admin())
      .expect(409);
    await http()
      .delete(`${api}/categories/${categoryA}`)
      .set(admin())
      .expect(204, '');
    await http().get(`${api}/categories/${categoryA}`).expect(404);
    await http()
      .delete(`${api}/categories/${categoryA}`)
      .set(admin())
      .expect(404);
    await http()
      .patch(`${api}/categories/${categoryA}`)
      .set(admin())
      .send({ name: prefix })
      .expect(404);
  });

  it('soft-deletes without losing relationships, hides reads and reserves the code', async () => {
    await http()
      .delete(`${api}/products/${productId}`)
      .set(admin())
      .expect(200, { message: 'delete success' });
    const saved = await prisma.product.findUniqueOrThrow({
      where: { id: productId },
      include: { categories: true },
    });
    expect(saved.deletedAt).toBeInstanceOf(Date);
    expect(saved.categories.map((link) => link.categoryId)).toEqual([
      categoryB,
    ]);
    await http().get(`${api}/products/${productId}`).expect(404);
    await http()
      .patch(`${api}/products/${productId}`)
      .set(admin())
      .send({ name: 'Hidden' })
      .expect(404);
    await http()
      .delete(`${api}/products/${productId}`)
      .set(admin())
      .expect(404);
    await http()
      .delete(`${api}/categories/${categoryB}`)
      .set(admin())
      .expect(409);
    await http()
      .post(`${api}/products`)
      .set(admin())
      .send({ code: `${prefix}-001` })
      .expect(409);
    const listed = (
      await http().get(`${api}/products`).query({ search: prefix }).expect(200)
    ).body;
    expect(listed.total).toBe(1);
    expect(listed.data.some((p: { id: string }) => p.id === productId)).toBe(
      false,
    );
    expect(
      (
        await http()
          .get(`${api}/products`)
          .query({ categoryId: categoryB })
          .expect(200)
      ).body.total,
    ).toBe(0);
  });
});
