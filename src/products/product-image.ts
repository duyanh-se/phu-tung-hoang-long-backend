export const PRODUCT_IMAGE_BASE_URL =
  'https://tvthanh.name.vn/public/templates/uploads/';

const uploadBaseUrl = (
  process.env.PUBLIC_API_BASE_URL ?? 'http://localhost:3000'
).replace(/\/$/, '');

export function productImageUrl(imagePath: string | null): string | null {
  const path = imagePath?.trim();
  if (!path) return null;
  // CRUD also accepts existing absolute image URLs.
  if (/^https?:\/\//i.test(path)) return path;
  if (/^\/?uploads\/[0-9a-f-]+\.(?:jpe?g|png|webp)$/i.test(path))
    return `${uploadBaseUrl}/${path.replace(/^\/+/, '')}`;
  return (
    PRODUCT_IMAGE_BASE_URL +
    path.replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/')
  );
}
