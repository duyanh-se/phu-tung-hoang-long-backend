import { Prisma } from '../generated/prisma/client';
import { ProductResponseDto } from './dto/product-response.dto';
import { productImageUrl } from './product-image';

export const productSelect = {
  id: true,
  code: true,
  name: true,
  description: true,
  price: true,
  currency: true,
  imagePath: true,
  manufacturerId: true,
  createdAt: true,
  updatedAt: true,
  manufacturer: { select: { id: true, name: true } },
  categories: { orderBy: { categoryId: 'asc' }, select: { category: true } },
} satisfies Prisma.ProductSelect;

export function toProductResponse(
  product: Prisma.ProductGetPayload<{ select: typeof productSelect }>,
): ProductResponseDto {
  return {
    ...product,
    price: product.price?.toString() ?? null,
    imageUrl: productImageUrl(product.imagePath),
    categories: product.categories.map((link) => link.category),
  };
}
