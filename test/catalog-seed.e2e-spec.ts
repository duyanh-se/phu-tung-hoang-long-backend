import { randomInt, randomUUID } from 'node:crypto';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { parseCatalog } from '../prisma/import/catalog';
import { importCatalog } from '../prisma/import/import-catalog';

describe('Catalog seed (PostgreSQL)', () => {
  let prisma: PrismaClient;
  const base = 2000000000 + randomInt(100000000);
  const prefix = randomUUID();
  const header =
    'ID;prd_code;prd_name;prd_sell_price;prd_image_url;prd_manufacture_id\n';
  const manufacturers = `ID;prd_manuf_name\n${base};Hãng thử nghiệm\n`;
  const products =
    header +
    `${base};${prefix}-001;Ốc vít;49140;1744694197.jpg;${base}\n` +
    `${base + 1};${prefix}-002;;0;;2\n`;
  const catalog = parseCatalog(products, manufacturers);
  let categoryId: string;

  beforeAll(async () => {
    const url = process.env.TEST_DATABASE_URL;
    if (!url || !new URL(url).pathname.endsWith('_test'))
      throw new Error(
        'TEST_DATABASE_URL must point to a dedicated database ending with _test',
      );
    prisma = new PrismaClient({
      adapter: new PrismaPg({
        connectionString: url,
        connectionTimeoutMillis: 5000,
      }),
    });
    await prisma.$connect();
  });

  afterAll(async () => {
    if (prisma) {
      await prisma.product.deleteMany({
        where: { code: { startsWith: prefix } },
      });
      if (categoryId)
        await prisma.category.delete({ where: { id: categoryId } });
      await prisma.manufacturer.deleteMany({
        where: { legacyId: { in: [base, base + 1] } },
      });
      await prisma.$disconnect();
    }
  });

  it('imports both valid and incomplete products without inventing manufacturers or prices', async () => {
    expect(await importCatalog(prisma, catalog)).toMatchObject({
      manufacturersCreated: 1,
      productsCreated: 2,
    });
    const known = await prisma.product.findUniqueOrThrow({
      where: { legacyId: base },
      include: { manufacturer: true },
    });
    expect(known.price?.toString()).toBe('49140');
    expect(known.manufacturer?.legacyId).toBe(base);
    expect(known.imagePath).toBe('1744694197.jpg');
    const incomplete = await prisma.product.findUniqueOrThrow({
      where: { legacyId: base + 1 },
    });
    expect(incomplete).toMatchObject({
      name: null,
      price: null,
      manufacturerId: null,
      sourceManufacturerId: 2,
      currency: 'VND',
    });
  });

  it('is idempotent, including simultaneous reruns, and preserves IDs and timestamps', async () => {
    const before = await prisma.product.findUniqueOrThrow({
      where: { legacyId: base },
    });
    const results = await Promise.all([
      importCatalog(prisma, catalog),
      importCatalog(prisma, catalog),
    ]);
    for (const result of results)
      expect(result).toMatchObject({
        manufacturersUnchanged: 1,
        productsUnchanged: 2,
        productsCreated: 0,
        productsUpdated: 0,
      });
    expect(
      await prisma.product.findUniqueOrThrow({ where: { legacyId: base } }),
    ).toEqual(before);
  });

  it('updates changed source records without creating duplicates', async () => {
    const changed = parseCatalog(
      products.replace('49140', '50000'),
      manufacturers.replace('Hãng thử nghiệm', 'Tên hãng mới'),
    );
    expect(await importCatalog(prisma, changed)).toMatchObject({
      manufacturersUpdated: 1,
      productsUpdated: 1,
      productsCreated: 0,
      productsUnchanged: 1,
    });
    expect(
      (
        await prisma.product.findUniqueOrThrow({ where: { legacyId: base } })
      ).price?.toString(),
    ).toBe('50000');
  });

  it('rolls back all writes when a source ID tries to take another product code', async () => {
    const conflict = parseCatalog(
      header + `${base + 2};${prefix}-001;Conflict;100;;${base + 1}\n`,
      `ID;prd_manuf_name\n${base + 1};Must roll back\n`,
    );
    await expect(importCatalog(prisma, conflict)).rejects.toThrow(
      'belongs to another record',
    );
    expect(
      await prisma.manufacturer.findUnique({ where: { legacyId: base + 1 } }),
    ).toBeNull();
    expect(
      (
        await prisma.product.findUniqueOrThrow({ where: { legacyId: base } })
      ).price?.toString(),
    ).toBe('50000');
  });

  it('preserves soft deletion, descriptions and category links when reseeding changed source fields', async () => {
    categoryId = (await prisma.category.create({ data: { name: prefix } })).id;
    const deletedAt = new Date();
    await prisma.product.update({
      where: { legacyId: base },
      data: {
        deletedAt,
        description: 'Store-managed description',
        categories: { create: { categoryId } },
      },
    });
    await importCatalog(prisma, catalog);
    const saved = await prisma.product.findUniqueOrThrow({
      where: { legacyId: base },
      include: { categories: true },
    });
    expect(saved.price?.toString()).toBe('49140');
    expect(saved.deletedAt).toEqual(deletedAt);
    expect(saved.description).toBe('Store-managed description');
    expect(saved.categories.map((link) => link.categoryId)).toEqual([
      categoryId,
    ]);
  });
});
