import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ContactRequestQueryDto } from './dto/contact-request-query.dto';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';
import { UpdateContactRequestDto } from './dto/update-contact-request.dto';
export declare class ContactRequestsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateContactRequestDto): Prisma.Prisma__ContactRequestClient<{
        status: import("../generated/prisma/enums").ContactRequestStatus;
        email: string;
        id: string;
        fullName: string;
        createdAt: Date;
        updatedAt: Date;
        phoneNumber: string;
        reason: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    list({ page, limit, search, status }: ContactRequestQueryDto): Promise<{
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
    remove(id: string): Promise<void>;
    private rethrow;
}
