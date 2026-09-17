import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list({ page, limit, search, categoryId, manufacturerId, sort, minPrice, maxPrice, }: ProductQueryDto): Promise<{
        data: import("./dto/product-response.dto").ProductResponseDto[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("./dto/product-response.dto").ProductResponseDto>;
    create(dto: CreateProductDto): Promise<import("./dto/product-response.dto").ProductResponseDto>;
    update(id: string, dto: UpdateProductDto): Promise<import("./dto/product-response.dto").ProductResponseDto>;
    remove(id: string): Promise<void>;
    private fields;
    private validateReferences;
    private rethrow;
}
