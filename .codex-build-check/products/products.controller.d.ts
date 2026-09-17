import { CreateProductDto } from './dto/create-product.dto';
import { DeleteProductResponseDto } from './dto/delete-product-response.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly products;
    constructor(products: ProductsService);
    list(query: ProductQueryDto): Promise<{
        data: ProductResponseDto[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<ProductResponseDto>;
    create(dto: CreateProductDto): Promise<ProductResponseDto>;
    update(id: string, dto: UpdateProductDto): Promise<ProductResponseDto>;
    remove(id: string): Promise<DeleteProductResponseDto>;
}
