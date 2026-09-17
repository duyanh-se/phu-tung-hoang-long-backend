import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Role } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list({ page, limit }: PaginationQueryDto): Promise<{
        data: {
            email: string;
            id: string;
            fullName: string;
            role: Role;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        email: string;
        id: string;
        fullName: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(id: string, dto: UpdateProfileDto): Promise<{
        email: string;
        id: string;
        fullName: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateRole(id: string, role: Role, actorId: string): Promise<{
        email: string;
        id: string;
        fullName: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private update;
}
