import type { AuthenticatedUser } from '../auth/types/authenticated-request';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Role } from '../generated/prisma/enums';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    updateMe(user: AuthenticatedUser, dto: UpdateProfileDto): Promise<{
        email: string;
        id: string;
        fullName: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    list(query: PaginationQueryDto): Promise<{
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
    updateRole(id: string, dto: UpdateRoleDto, user: AuthenticatedUser): Promise<{
        email: string;
        id: string;
        fullName: string;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
