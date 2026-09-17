import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';
import { setupApp } from '../src/setup-app';

describe('Product price filters (PostgreSQL)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let manufacturerId: string;
  const prefix = `filter-${randomUUID()}`;
  const endpoint = '/api/v1/products';
  beforeAll(async () => {
    const url = process.env.TEST_DATABASE_URL;
    if (!url || !new URL(url).pathname.endsWith('_test'))
      throw new Error('Dedicated TEST_DATABASE_URL required');
    process.env.DATABASE_URL = url;
    process.env.NODE_ENV = 'test';
    process.env.JWT_ACCESS_SECRET = 'test-only-secret-'.repeat(4);
    process.env.SWAGGER_ENABLED = 'true';
    const { AppModule } = await import('../src/app.module');
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    setupApp(app);
    await app.init();
    prisma = app.get(PrismaService);
    manufacturerId = (
      await prisma.manufacturer.create({ data: { name: prefix } })
    ).id;
    await prisma.product.createMany({
      data: [
        { code: `${prefix}-low`, price: 100, manufacturerId },
        { code: `${prefix}-mid-a`, price: 200, manufacturerId },
        { code: `${prefix}-mid-b`, price: 200, manufacturerId },
        { code: `${prefix}-high`, price: 300, manufacturerId },
        { code: `${prefix}-unknown`, price: null, manufacturerId },
        { code: `${prefix}-other`, price: 150 },
        {
          code: `${prefix}-deleted`,
          price: 120,
          manufacturerId,
          deletedAt: new Date(),
        },
      ],
    });
  });
  afterAll(async () => {
    if (prisma) {
      await prisma.product.deleteMany({
        where: { code: { startsWith: prefix } },
      });
      if (manufacturerId)
        await prisma.manufacturer.delete({ where: { id: manufacturerId } });
    }
    if (app) await app.close();
  });
  it.each(['price_asc', 'price_desc'])(
    'sorts across pages with null last and stable ties: %s',
    async (sort) => {
      const rows: { id: string; price: string | null }[] = [];
      for (let page = 1; page <= 3; page++) {
        const { body } = await request(app.getHttpServer())
          .get(endpoint)
          .query({ search: prefix, manufacturerId, sort, page, limit: 2 })
          .expect(200);
        expect(body.total).toBe(5);
        rows.push(...body.data);
      }
      expect(rows.map((item) => item.price)).toEqual(
        sort === 'price_asc'
          ? ['100', '200', '200', '300', null]
          : ['300', '200', '200', '100', null],
      );
      expect(new Set(rows.map((item) => item.id)).size).toBe(5);
      const ties = rows
        .filter((item) => item.price === '200')
        .map((item) => item.id);
      expect(ties).toEqual([...ties].sort());
    },
  );
  it('combines inclusive price bounds, manufacturer and search before count/pagination', async () => {
    const { body } = await request(app.getHttpServer())
      .get(endpoint)
      .query({
        search: prefix,
        manufacturerId,
        minPrice: 100,
        maxPrice: 200,
        sort: 'price_desc',
        limit: 2,
      })
      .expect(200);
    expect(body.total).toBe(3);
    expect(body.totalPages).toBe(2);
    expect(body.data.map((item: { price: string }) => item.price)).toEqual([
      '200',
      '200',
    ]);
    const empty = await request(app.getHttpServer())
      .get(endpoint)
      .query({ search: prefix, minPrice: 400 })
      .expect(200);
    expect(empty.body.total).toBe(0);
    const maxOnly = await request(app.getHttpServer())
      .get(endpoint)
      .query({ search: prefix, maxPrice: 100 })
      .expect(200);
    expect(
      maxOnly.body.data.map((item: { price: string }) => item.price),
    ).toEqual(['100']);
  });
  it.each([
    { minPrice: '-1' },
    { maxPrice: 'abc' },
    { minPrice: '' },
    { minPrice: '1.001' },
    { maxPrice: '1000000000000' },
    { minPrice: '200', maxPrice: '100' },
    { sort: 'invalid' },
  ])('rejects invalid filters %j', async (query) => {
    await request(app.getHttpServer()).get(endpoint).query(query).expect(400);
  });
  it('publishes price filters and sort in Swagger', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/docs-json')
      .expect(200);
    const params = body.paths[endpoint].get.parameters;
    expect(params.map((item: { name: string }) => item.name)).toEqual(
      expect.arrayContaining([
        'sort',
        'minPrice',
        'maxPrice',
        'manufacturerId',
      ]),
    );
  });
});
