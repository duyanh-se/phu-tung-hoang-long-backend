import { ContactRequestStatus } from '../../generated/prisma/enums';
export declare class ContactRequestResponseDto {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    reason: string | null;
    status: ContactRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ContactRequestListResponseDto {
    data: ContactRequestResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare class DeleteContactRequestResponseDto {
    message: string;
}
