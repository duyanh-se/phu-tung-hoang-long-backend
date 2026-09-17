import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { ManufacturerQueryDto } from './dto/manufacturer-query.dto';
import { DeleteManufacturerResponseDto } from './dto/manufacturer-response.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { ManufacturersService } from './manufacturers.service';
export declare class ManufacturersController {
    private readonly manufacturers;
    constructor(manufacturers: ManufacturersService);
    list(query: ManufacturerQueryDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    create(dto: CreateManufacturerDto): import("../generated/prisma/models").Prisma__ManufacturerClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    update(id: string, dto: UpdateManufacturerDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    remove(id: string): Promise<DeleteManufacturerResponseDto>;
}
