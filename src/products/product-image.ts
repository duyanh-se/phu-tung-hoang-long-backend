export const PRODUCT_IMAGE_BASE_URL =
  'https://tvthanh.name.vn/public/templates/uploads/';

export function productImageUrl(imagePath: string | null): string | null {
  const path = imagePath?.trim();
  if (!path) return null;
  // CRUD also accepts existing absolute image URLs.
  if (/^https?:\/\//i.test(path)) return path;
  return (
    PRODUCT_IMAGE_BASE_URL +
    path.replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/')
  );
}
