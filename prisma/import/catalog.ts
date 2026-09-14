import { parse } from 'csv-parse/sync';

export interface ManufacturerRow {
  legacyId: number;
  name: string;
}

export interface ProductRow {
  legacyId: number;
  code: string;
  name: string | null;
  price: string | null;
  currency: 'VND';
  imagePath: string | null;
  sourceManufacturerId: number | null;
}

export interface Catalog {
  manufacturers: ManufacturerRow[];
  products: ProductRow[];
}

function readCsv(content: string, headers: string[]): Record<string, string>[] {
  const rows = parse(content, {
    bom: true,
    delimiter: ';',
    skip_empty_lines: true,
    columns: (actual: string[]) => {
      if (
        actual.length !== headers.length ||
        !headers.every((h) => actual.includes(h))
      ) {
        throw new Error(
          `CSV must have exactly these columns: ${headers.join(', ')}`,
        );
      }
      return actual;
    },
  }) as Record<string, string>[];
  if (!rows.length) throw new Error('CSV contains no data rows');
  return rows;
}

function sourceId(value: string, field: string, row: number): number {
  const id = Number(value);
  if (
    !/^\d+$/.test(value) ||
    !Number.isSafeInteger(id) ||
    id < 1 ||
    id > 2147483647
  ) {
    throw new Error(`Invalid ${field} at CSV record ${row + 2}`);
  }
  return id;
}

function nullableText(value: string): string | null {
  return value.trim().length ? value : null;
}

function assertUnique<T>(
  rows: T[],
  key: (row: T) => string | number,
  label: string,
) {
  const keys = new Set<string | number>();
  for (const row of rows) {
    const value = key(row);
    if (keys.has(value)) throw new Error(`Duplicate ${label}: ${value}`);
    keys.add(value);
  }
}

export function parseCatalog(
  productsCsv: string,
  manufacturersCsv: string,
): Catalog {
  const manufacturers = readCsv(manufacturersCsv, ['ID', 'prd_manuf_name']).map(
    (r, i) => {
      if (!r.prd_manuf_name.trim())
        throw new Error(`Missing manufacturer name at CSV record ${i + 2}`);
      return {
        legacyId: sourceId(r.ID, 'manufacturer ID', i),
        name: r.prd_manuf_name,
      };
    },
  );
  const products = readCsv(productsCsv, [
    'ID',
    'prd_code',
    'prd_name',
    'prd_sell_price',
    'prd_image_url',
    'prd_manufacture_id',
  ]).map((r, i): ProductRow => {
    if (!r.prd_code.trim())
      throw new Error(`Missing product code at CSV record ${i + 2}`);
    // These source files use whole VND amounts. Reject unexpected formats instead of rounding.
    if (
      !/^\d+$/.test(r.prd_sell_price) ||
      BigInt(r.prd_sell_price) > 999999999999n
    ) {
      throw new Error(`Invalid whole VND price at CSV record ${i + 2}`);
    }
    const amount = BigInt(r.prd_sell_price);
    return {
      legacyId: sourceId(r.ID, 'product ID', i),
      code: r.prd_code,
      name: nullableText(r.prd_name),
      price: amount === 0n ? null : amount.toString(),
      currency: 'VND',
      imagePath: nullableText(r.prd_image_url),
      sourceManufacturerId: r.prd_manufacture_id.trim()
        ? sourceId(r.prd_manufacture_id, 'product manufacturer ID', i)
        : null,
    };
  });
  assertUnique(manufacturers, (r) => r.legacyId, 'manufacturer ID');
  assertUnique(products, (r) => r.legacyId, 'product ID');
  assertUnique(products, (r) => r.code, 'product code');
  return { manufacturers, products };
}

export function summarizeCatalog(catalog: Catalog) {
  const manufacturerIds = new Set(catalog.manufacturers.map((r) => r.legacyId));
  const missingManufacturerIds: Record<string, number> = {};
  let missingManufacturerCount = 0;
  for (const product of catalog.products) {
    if (
      product.sourceManufacturerId === null ||
      !manufacturerIds.has(product.sourceManufacturerId)
    ) {
      missingManufacturerCount++;
      const key = String(product.sourceManufacturerId ?? 'blank');
      missingManufacturerIds[key] = (missingManufacturerIds[key] ?? 0) + 1;
    }
  }
  return {
    manufacturers: catalog.manufacturers.length,
    products: catalog.products.length,
    missingNames: catalog.products.filter((p) => p.name === null).length,
    unknownPrices: catalog.products.filter((p) => p.price === null).length,
    images: catalog.products.filter((p) => p.imagePath !== null).length,
    missingManufacturerCount,
    missingManufacturerIds,
    currency: 'VND',
  };
}
