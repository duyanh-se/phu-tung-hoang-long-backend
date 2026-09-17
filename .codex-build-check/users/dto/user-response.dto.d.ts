import { Role } from '../../generated/prisma/enums';
export declare class UserResponseDto {
    id: string;
    email: string;
    fullName: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
export declare class UserListResponseDto {
    data: UserResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
