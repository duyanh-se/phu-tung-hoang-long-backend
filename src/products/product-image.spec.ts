import { productImageUrl, PRODUCT_IMAGE_BASE_URL } from './product-image';

describe('product image URL', () => {
  it('uses the store uploads directory for a source filename', () => {
    expect(productImageUrl('1744694197.jpg')).toBe(
      'https://tvthanh.name.vn/public/templates/uploads/1744694197.jpg',
    );
  });

  it.each([null, '', '   '])('keeps missing images nullable (%p)', (value) => {
    expect(productImageUrl(value)).toBeNull();
  });

  it('encodes filename characters instead of treating them as query or fragment', () => {
    expect(productImageUrl('ốc vít #1?.jpg')).toBe(
      PRODUCT_IMAGE_BASE_URL + encodeURIComponent('ốc vít #1?.jpg'),
    );
  });

  it('supports relative folders without doubling the slash', () => {
    expect(productImageUrl('/parts/anh 1.jpg')).toBe(
      PRODUCT_IMAGE_BASE_URL + 'parts/anh%201.jpg',
    );
  });

  it('preserves absolute HTTP(S) image URLs accepted by CRUD', () => {
    expect(productImageUrl('https://example.com/image.jpg?v=2')).toBe(
      'https://example.com/image.jpg?v=2',
    );
  });
});
