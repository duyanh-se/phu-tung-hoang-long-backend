import { Prisma, PrismaClient } from '../../src/generated/prisma/client';
import type { Catalog } from './catalog';

export async function importCatalog(
  prisma: PrismaClient,
  catalog: Catalog,
  onProgress?: (processed: number, total: number) => void,
) {
  return prisma.$transaction(
    async (tx) => {
      // Serialize catalog imports; the lock is released on commit or rollback.
      await tx.$queryRaw`SELECT pg_advisory_xact_lock(184704, 1)::text`;
      const counts = {
        manufacturersCreated: 0,
        manufacturersUpdated: 0,
        manufacturersUnchanged: 0,
        productsCreated: 0,
        productsUpdated: 0,
        productsUnchanged: 0,
      };
      const manufacturers = new Map<number, string>();
      for (const row of catalog.manufacturers) {
        const existing = await tx.manufacturer.findUnique({
          where: { legacyId: row.legacyId },
        });
        if (!existing) {
          const created = await tx.manufacturer.create({ data: row });
          manufacturers.set(row.legacyId, created.id);
          counts.manufacturersCreated++;
        } else {
          manufacturers.set(row.legacyId, existing.id);
          if (existing.name !== row.name) {
            await tx.manufacturer.update({
              where: { id: existing.id },
              data: { name: row.name },
            });
            counts.manufacturersUpdated++;
          } else counts.manufacturersUnchanged++;
        }
      }

      for (let offset = 0; offset < catalog.products.length; offset += 1000) {
        const batch = catalog.products.slice(offset, offset + 1000);
        const existing = await tx.product.findMany({
          where: {
            OR: [
              { legacyId: { in: batch.map((p) => p.legacyId) } },
              { code: { in: batch.map((p) => p.code) } },
            ],
          },
        });
        const byLegacyId = new Map(existing.map((p) => [p.legacyId, p]));
        const byCode = new Map(existing.map((p) => [p.code, p]));
        const creates: Prisma.ProductCreateManyInput[] = [];
        for (const row of batch) {
          const codeOwner = byCode.get(row.code);
          if (codeOwner && codeOwner.legacyId !== row.legacyId) {
            throw new Error(
              `Product code ${row.code} belongs to another record; import rolled back`,
            );
          }
          const manufacturerId =
            row.sourceManufacturerId === null
              ? null
              : (manufacturers.get(row.sourceManufacturerId) ?? null);
          const data = { ...row, manufacturerId };
          const current = byLegacyId.get(row.legacyId);
          if (!current) {
            creates.push(data);
          } else if (
            current.code !== row.code ||
            current.name !== row.name ||
            (current.price?.toString() ?? null) !== row.price ||
            current.currency !== row.currency ||
            current.imagePath !== row.imagePath ||
            current.manufacturerId !== manufacturerId ||
            current.sourceManufacturerId !== row.sourceManufacturerId
          ) {
            await tx.product.update({ where: { id: current.id }, data });
            counts.productsUpdated++;
          } else counts.productsUnchanged++;
        }
        if (creates.length) {
          const created = await tx.product.createMany({ data: creates });
          counts.productsCreated += created.count;
        }
        onProgress?.(
          Math.min(offset + batch.length, catalog.products.length),
          catalog.products.length,
        );
      }
      return counts;
    },
    { maxWait: 10000, timeout: 300000 },
  );
}
