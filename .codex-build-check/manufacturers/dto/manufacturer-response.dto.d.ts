export declare class ManufacturerResponseDto {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ManufacturerListResponseDto {
    data: ManufacturerResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare class DeleteManufacturerResponseDto {
    message: string;
}
