import { CategoryResponseDto } from '../../categories/dto/category-response.dto';
export declare class ProductManufacturerDto {
    id: string;
    name: string;
}
export declare class ProductResponseDto {
    id: string;
    code: string;
    name: string | null;
    description: string | null;
    price: string | null;
    currency: string;
    imagePath: string | null;
    imageUrl: string | null;
    manufacturerId: string | null;
    manufacturer: ProductManufacturerDto | null;
    categories: CategoryResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class ProductListResponseDto {
    data: ProductResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
