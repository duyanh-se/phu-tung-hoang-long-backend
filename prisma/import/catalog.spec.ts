import { parseCatalog, summarizeCatalog } from './catalog';

const header =
  'ID;prd_code;prd_name;prd_sell_price;prd_image_url;prd_manufacture_id\n';
const manufacturers = 'ID;prd_manuf_name\n9;HONDA\n';

describe('Product CSV import validation', () => {
  it('preserves Vietnamese, leading zero codes, quoted delimiters, multiline text and filenames', () => {
    const catalog = parseCatalog(
      '\uFEFF' + header + '1;0012;"Ốc; vít\nloại A";49140;1744694197.jpg;9\n',
      manufacturers,
    );
    expect(catalog.products[0]).toEqual({
      legacyId: 1,
      code: '0012',
      name: 'Ốc; vít\nloại A',
      price: '49140',
      currency: 'VND',
      imagePath: '1744694197.jpg',
      sourceManufacturerId: 9,
    });
  });
  it('keeps blank names, missing images and unknown prices as null without dropping products', () => {
    const catalog = parseCatalog(
      header + '1;ABC;;0;;2\n2;DEF;   ;000;;\n',
      manufacturers,
    );
    expect(catalog.products).toHaveLength(2);
    expect(catalog.products[0]).toMatchObject({
      name: null,
      price: null,
      imagePath: null,
      sourceManufacturerId: 2,
    });
    expect(catalog.products[1].sourceManufacturerId).toBeNull();
    expect(summarizeCatalog(catalog)).toMatchObject({
      missingNames: 2,
      unknownPrices: 2,
      missingManufacturerCount: 2,
      missingManufacturerIds: { '2': 1, blank: 1 },
    });
  });
  it.each(['-1', '1.5', 'abc', '', '1000000000000'])(
    'rejects invalid price %p',
    (price) => {
      expect(() =>
        parseCatalog(header + `1;ABC;Ốc;${price};;9\n`, manufacturers),
      ).toThrow('Invalid whole VND price');
    },
  );
  it('rejects duplicate product IDs and codes', () => {
    expect(() =>
      parseCatalog(header + '1;A;A;1;;9\n1;B;B;2;;9\n', manufacturers),
    ).toThrow('Duplicate product ID');
    expect(() =>
      parseCatalog(header + '1;A;A;1;;9\n2;A;B;2;;9\n', manufacturers),
    ).toThrow('Duplicate product code');
  });
  it('rejects duplicate manufacturer IDs and blank manufacturer names', () => {
    const products = header + '1;A;A;1;;9\n';
    expect(() => parseCatalog(products, manufacturers + '9;Other\n')).toThrow(
      'Duplicate manufacturer ID',
    );
    expect(() => parseCatalog(products, 'ID;prd_manuf_name\n9;\n')).toThrow(
      'Missing manufacturer name',
    );
  });
  it.each(['0', '-1', '1.2', '2147483648', 'abc'])(
    'rejects invalid source ID %p',
    (id) => {
      expect(() =>
        parseCatalog(header + `${id};A;A;1;;9\n`, manufacturers),
      ).toThrow('Invalid product ID');
    },
  );
  it('rejects unknown columns, missing cells and empty files rather than silently skipping data', () => {
    expect(() =>
      parseCatalog(
        header.replace('prd_code', 'unexpected') + '1;A;A;1;;9\n',
        manufacturers,
      ),
    ).toThrow('columns');
    expect(() => parseCatalog(header + '1;A;A\n', manufacturers)).toThrow();
    expect(() => parseCatalog(header, manufacturers)).toThrow('no data rows');
  });
});
