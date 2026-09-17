export declare class CreateProductDto {
    code: string;
    name?: string | null;
    description?: string | null;
    price?: number | null;
    imagePath?: string | null;
    manufacturerId?: string | null;
    categoryIds?: string[];
}
