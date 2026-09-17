export declare class CategoryResponseDto {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CategoryListResponseDto {
    data: CategoryResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
