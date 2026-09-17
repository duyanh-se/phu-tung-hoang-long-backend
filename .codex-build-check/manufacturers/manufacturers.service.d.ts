import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { ManufacturerQueryDto } from './dto/manufacturer-query.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
export declare class ManufacturersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateManufacturerDto): Prisma.Prisma__ManufacturerClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    list({ page, limit, search }: ManufacturerQueryDto): Promise<{
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
    update(id: string, dto: UpdateManufacturerDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    remove(id: string): Promise<void>;
    private rethrow;
}
