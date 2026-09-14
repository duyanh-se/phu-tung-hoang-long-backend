import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { ManufacturerQueryDto } from './dto/manufacturer-query.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

const manufacturerSelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.ManufacturerSelect;

@Injectable()
export class ManufacturersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateManufacturerDto) {
    return this.prisma.manufacturer.create({
      data: { name: dto.name },
      select: manufacturerSelect,
    });
  }

  async list({ page, limit, search }: ManufacturerQueryDto) {
    const where: Prisma.ManufacturerWhereInput = search
      ? { name: { contains: search, mode: 'insensitive' } }
      : {};
    const [data, total] = await this.prisma.$transaction(
      [
        this.prisma.manufacturer.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
          select: manufacturerSelect,
        }),
        this.prisma.manufacturer.count({ where }),
      ],
      { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead },
    );
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const manufacturer = await this.prisma.manufacturer.findUnique({
      where: { id },
      select: manufacturerSelect,
    });
    if (!manufacturer) throw new NotFoundException('Manufacturer not found');
    return manufacturer;
  }

  async update(id: string, dto: UpdateManufacturerDto) {
    try {
      return await this.prisma.manufacturer.update({
        where: { id },
        data: { name: dto.name },
        select: manufacturerSelect,
      });
    } catch (error) {
      this.rethrow(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      // The RESTRICT FK also prevents deletion while a product is linked concurrently.
      await this.prisma.manufacturer.delete({ where: { id } });
    } catch (error) {
      this.rethrow(error);
    }
  }

  private rethrow(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025')
        throw new NotFoundException('Manufacturer not found');
      if (error.code === 'P2003')
        throw new ConflictException(
          'Manufacturer still contains products, including soft-deleted products. Remove product links before deleting it.',
        );
    }
    throw error;
  }
}
