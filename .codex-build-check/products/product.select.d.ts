import { Prisma } from '../generated/prisma/client';
import { ProductResponseDto } from './dto/product-response.dto';
export declare const productSelect: {
    id: true;
    code: true;
    name: true;
    description: true;
    price: true;
    currency: true;
    imagePath: true;
    manufacturerId: true;
    createdAt: true;
    updatedAt: true;
    manufacturer: {
        select: {
            id: true;
            name: true;
        };
    };
    categories: {
        orderBy: {
            categoryId: "asc";
        };
        select: {
            category: true;
        };
    };
};
export declare function toProductResponse(product: Prisma.ProductGetPayload<{
    select: typeof productSelect;
}>): ProductResponseDto;
