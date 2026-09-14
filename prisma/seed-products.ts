import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { parseArgs } from 'node:util';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { parseCatalog, summarizeCatalog } from './import/catalog';
import { importCatalog } from './import/import-catalog';

async function main() {
  const { values } = parseArgs({
    options: {
      products: { type: 'string' },
      manufacturers: { type: 'string' },
      'dry-run': { type: 'boolean', default: false },
    },
  });
  if (!values.products || !values.manufacturers) {
    throw new Error(
      'Usage: npm run prisma:seed:products -- --products "products.csv" --manufacturers "manufacturers.csv" [--dry-run]',
    );
  }
  const [productsBuffer, manufacturersBuffer] = await Promise.all([
    readFile(values.products),
    readFile(values.manufacturers),
  ]);
  const decoder = new TextDecoder('utf-8', { fatal: true });
  const catalog = parseCatalog(
    decoder.decode(productsBuffer),
    decoder.decode(manufacturersBuffer),
  );
  console.log(
    JSON.stringify(
      {
        mode: values['dry-run'] ? 'validation-only' : 'import',
        sourceSha256: {
          products: createHash('sha256').update(productsBuffer).digest('hex'),
          manufacturers: createHash('sha256')
            .update(manufacturersBuffer)
            .digest('hex'),
        },
        ...summarizeCatalog(catalog),
      },
      null,
      2,
    ),
  );
  if (values['dry-run']) return;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is required');
  const url = new URL(connectionString);
  console.log(
    JSON.stringify({
      database: url.pathname.slice(1),
      host: url.hostname,
      port: url.port || '5432',
    }),
  );
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString, connectionTimeoutMillis: 10000 }),
  });
  try {
    const result = await importCatalog(prisma, catalog, (processed, total) => {
      if (processed % 10000 === 0 || processed === total)
        console.log(
          `Processed ${processed}/${total} products (transaction pending)`,
        );
    });
    console.log('Import committed.');
    console.log(JSON.stringify(result, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(
    error instanceof Error ? error.message : 'Product import failed',
  );
  process.exitCode = 1;
});
