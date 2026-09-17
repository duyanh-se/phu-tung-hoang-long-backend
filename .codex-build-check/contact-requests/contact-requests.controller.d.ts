import { ContactRequestsService } from './contact-requests.service';
import { ContactRequestQueryDto } from './dto/contact-request-query.dto';
import { DeleteContactRequestResponseDto } from './dto/contact-request-response.dto';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';
import { UpdateContactRequestDto } from './dto/update-contact-request.dto';
export declare class ContactRequestsController {
    private readonly contacts;
    constructor(contacts: ContactRequestsService);
    create(dto: CreateContactRequestDto): import("../generated/prisma/models").Prisma__ContactRequestClient<{
        status: import("../generated/prisma/enums").ContactRequestStatus;
        email: string;
        id: string;
        fullName: string;
        createdAt: Date;
        updatedAt: Date;
        phoneNumber: string;
        reason: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    list(query: ContactRequestQueryDto): Promise<{
        data: {
            status: import("../generated/prisma/enums").ContactRequestStatus;
            email: string;
            id: string;
            fullName: string;
            createdAt: Date;
            updatedAt: Date;
            phoneNumber: string;
            reason: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        status: import("../generated/prisma/enums").ContactRequestStatus;
        email: string;
        id: string;
        fullName: string;
        createdAt: Date;
        updatedAt: Date;
        phoneNumber: string;
        reason: string | null;
    }>;
    update(id: string, dto: UpdateContactRequestDto): Promise<{
        status: import("../generated/prisma/enums").ContactRequestStatus;
        email: string;
        id: string;
        fullName: string;
        createdAt: Date;
        updatedAt: Date;
        phoneNumber: string;
        reason: string | null;
    }>;
    remove(id: string): Promise<DeleteContactRequestResponseDto>;
}
