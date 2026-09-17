import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryQueryDto } from './dto/category-query.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCategoryDto): Prisma.Prisma__CategoryClient<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    list({ page, limit, search }: CategoryQueryDto): Promise<{
        data: {
            description: string | null;
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
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    update(id: string, dto: UpdateCategoryDto): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }>;
    remove(id: string): Promise<void>;
    private rethrow;
}
