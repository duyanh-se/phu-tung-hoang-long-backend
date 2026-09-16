import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ContactRequestQueryDto } from './dto/contact-request-query.dto';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';
import { UpdateContactRequestDto } from './dto/update-contact-request.dto';

const contactRequestSelect = {
  id: true,
  fullName: true,
  email: true,
  phoneNumber: true,
  reason: true,
  status: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ContactRequestSelect;

@Injectable()
export class ContactRequestsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateContactRequestDto) {
    return this.prisma.contactRequest.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        reason: dto.reason,
      },
      select: contactRequestSelect,
    });
  }

  async list({ page, limit, search, status }: ContactRequestQueryDto) {
    const where: Prisma.ContactRequestWhereInput = {
      status,
      ...(search
        ? {
            OR: [
              { fullName: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
              { phoneNumber: { contains: search } },
            ],
          }
        : {}),
    };
    const [data, total] = await this.prisma.$transaction(
      [
        this.prisma.contactRequest.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
          select: contactRequestSelect,
        }),
        this.prisma.contactRequest.count({ where }),
      ],
      { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead },
    );
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const contact = await this.prisma.contactRequest.findUnique({
      where: { id },
      select: contactRequestSelect,
    });
    if (!contact) throw new NotFoundException('Contact request not found');
    return contact;
  }

  async update(id: string, dto: UpdateContactRequestDto) {
    try {
      return await this.prisma.contactRequest.update({
        where: { id },
        data: {
          fullName: dto.fullName,
          email: dto.email,
          phoneNumber: dto.phoneNumber,
          reason: dto.reason,
          status: dto.status,
        },
        select: contactRequestSelect,
      });
    } catch (error) {
      this.rethrow(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.contactRequest.delete({ where: { id } });
    } catch (error) {
      this.rethrow(error);
    }
  }

  private rethrow(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new NotFoundException('Contact request not found');
    }
    throw error;
  }
}
