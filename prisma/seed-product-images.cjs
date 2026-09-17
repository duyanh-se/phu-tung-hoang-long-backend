require('dotenv').config({ quiet: true });
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { parse } = require('csv-parse/sync');
const { Client } = require('pg');

const base = 'https://320btn.phanmemdungthu.io.vn/public/templates/uploads/';
async function main() {
  const file = process.argv[2];
  if (!file) throw new Error('Usage: node prisma/seed-product-images.cjs products.csv [--apply]');
  const rows = parse(fs.readFileSync(file, 'utf8'), { columns: true, delimiter: ';', bom: true, skip_empty_lines: true });
  const invalid = rows.filter((row) => row.prd_image_url?.trim() && !/^[^/\\]+\.(jpg|jpeg|png|webp|gif)$/i.test(row.prd_image_url.trim()));
  const images = rows.filter((row) => row.prd_image_url?.trim() && !invalid.includes(row)).map((row) => {
    const filename = row.prd_image_url.trim();
    if (!/^[^/\\]+\.(jpg|jpeg|png|webp|gif)$/i.test(filename)) throw new Error('Invalid image filename for ' + row.prd_code);
    return { code: row.prd_code.trim(), legacyId: Number(row.ID), url: base + encodeURIComponent(filename) };
  });
  if (new Set(images.map((row) => row.code)).size !== images.length) throw new Error('Duplicate product codes');
  const db = new Client({ connectionString: process.env.DATABASE_URL });
  await db.connect();
  try {
    await db.query('BEGIN');
    const { rows: products } = await db.query('SELECT id, code, legacy_id, image_path FROM products WHERE code = ANY($1) FOR UPDATE', [images.map((row) => row.code)]);
    const byCode = new Map(products.map((row) => [row.code, row]));
    for (const image of images) {
      const product = byCode.get(image.code);
      if (!product || product.legacy_id !== image.legacyId) throw new Error('Product identity mismatch: ' + image.code);
    }
    const changed = images.filter((row) => byCode.get(row.code).image_path !== row.url);
    console.log(JSON.stringify({ rows: rows.length, withImages: images.length, matched: products.length, toUpdate: changed.length, skippedInvalid: invalid.length, skippedBlank: rows.length - images.length - invalid.length }));
    if (!process.argv.includes('--apply')) { await db.query('ROLLBACK'); return; }
    const backup = path.join(os.tmpdir(), `hoanglong-image-backup-${Date.now()}.json`);
    fs.writeFileSync(backup, JSON.stringify(products.filter((row) => changed.some((image) => image.code === row.code)), null, 2), { flag: 'wx' });
    for (let offset = 0; offset < changed.length; offset += 500) {
      const batch = changed.slice(offset, offset + 500);
      await db.query('UPDATE products AS p SET image_path = v.url, updated_at = NOW() FROM unnest($1::text[], $2::text[]) AS v(code, url) WHERE p.code = v.code', [batch.map((row) => row.code), batch.map((row) => row.url)]);
    }
    const { rows: verified } = await db.query('SELECT code, image_path FROM products WHERE code = ANY($1)', [images.map((row) => row.code)]);
    const expected = new Map(images.map((row) => [row.code, row.url]));
    if (verified.some((row) => expected.get(row.code) !== row.image_path)) throw new Error('Verification failed');
    await db.query('COMMIT');
    console.log(JSON.stringify({ committed: changed.length, verified: verified.length, backup }));
  } catch (error) { await db.query('ROLLBACK'); throw error; }
  finally { await db.end(); }
}
main().catch((error) => { console.error(error.message); process.exitCode = 1; });
