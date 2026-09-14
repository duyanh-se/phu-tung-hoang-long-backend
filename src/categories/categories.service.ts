import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryQueryDto } from './dto/category-query.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: { name: dto.name, description: dto.description },
    });
  }

  async list({ page, limit, search }: CategoryQueryDto) {
    const where: Prisma.CategoryWhereInput = search
      ? { name: { contains: search, mode: 'insensitive' } }
      : {};
    const [data, total] = await this.prisma.$transaction(
      [
        this.prisma.category.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        }),
        this.prisma.category.count({ where }),
      ],
      { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead },
    );
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: { name: dto.name, description: dto.description },
      });
    } catch (error) {
      this.rethrow(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      // The RESTRICT foreign key also protects against products being linked concurrently.
      await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new ConflictException(
          'Category still contains products, including soft-deleted products. Remove product links before deleting it.',
        );
      }
      this.rethrow(error);
    }
  }

  private rethrow(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    )
      throw new NotFoundException('Category not found');
    throw error;
  }
}
