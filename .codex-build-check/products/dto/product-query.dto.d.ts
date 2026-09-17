import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
export declare class ProductQueryDto extends PaginationQueryDto {
    search?: string;
    categoryId?: string;
    manufacturerId?: string;
    sort?: 'newest' | 'price_asc' | 'price_desc';
    minPrice?: number;
    maxPrice?: number;
}
