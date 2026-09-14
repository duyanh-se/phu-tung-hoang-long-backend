import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productSelect, toProductResponse } from './product.select';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async list({
    page,
    limit,
    search,
    categoryId,
    manufacturerId,
  }: ProductQueryDto) {
    const where: Prisma.ProductWhereInput = {
      deletedAt: null,
      ...(search
        ? {
            OR: [
              { code: { contains: search, mode: 'insensitive' } },
              { name: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(categoryId ? { categories: { some: { categoryId } } } : {}),
      ...(manufacturerId ? { manufacturerId } : {}),
    };
    const [products, total] = await this.prisma.$transaction(
      [
        this.prisma.product.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
          select: productSelect,
        }),
        this.prisma.product.count({ where }),
      ],
      { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead },
    );
    return {
      data: products.map(toProductResponse),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id, deletedAt: null },
      select: productSelect,
    });
    if (!product) throw new NotFoundException('Product not found');
    return toProductResponse(product);
  }

  async create(dto: CreateProductDto) {
    try {
      const product = await this.prisma.$transaction(async (tx) => {
        await this.validateReferences(tx, dto);
        return tx.product.create({
          data: {
            ...this.fields(dto),
            code: dto.code,
            categories: {
              create: (dto.categoryIds ?? []).map((categoryId) => ({
                categoryId,
              })),
            },
          },
          select: productSelect,
        });
      });
      return toProductResponse(product);
    } catch (error) {
      this.rethrow(error);
    }
  }

  async update(id: string, dto: UpdateProductDto) {
    try {
      const product = await this.prisma.$transaction(async (tx) => {
        if (
          !(await tx.product.findUnique({
            where: { id, deletedAt: null },
            select: { id: true },
          }))
        )
          throw new NotFoundException('Product not found');
        await this.validateReferences(tx, dto);
        return tx.product.update({
          where: { id, deletedAt: null },
          data: {
            ...this.fields(dto),
            ...(dto.categoryIds !== undefined
              ? {
                  categories: {
                    deleteMany: {},
                    create: dto.categoryIds.map((categoryId) => ({
                      categoryId,
                    })),
                  },
                }
              : {}),
          },
          select: productSelect,
        });
      });
      return toProductResponse(product);
    } catch (error) {
      this.rethrow(error);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.product.update({
        where: { id, deletedAt: null },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      this.rethrow(error);
    }
  }

  private fields(dto: UpdateProductDto) {
    return {
      code: dto.code,
      name: dto.name,
      description: dto.description,
      price:
        dto.price === undefined
          ? undefined
          : dto.price === null || dto.price === 0
            ? null
            : new Prisma.Decimal(dto.price.toString()),
      imagePath: dto.imagePath,
      manufacturerId: dto.manufacturerId,
    };
  }

  private async validateReferences(
    tx: Prisma.TransactionClient,
    dto: UpdateProductDto,
  ) {
    if (
      dto.manufacturerId &&
      !(await tx.manufacturer.findUnique({
        where: { id: dto.manufacturerId },
        select: { id: true },
      }))
    )
      throw new BadRequestException('Manufacturer not found');
    if (dto.categoryIds?.length) {
      const count = await tx.category.count({
        where: { id: { in: dto.categoryIds } },
      });
      if (count !== dto.categoryIds.length)
        throw new BadRequestException('One or more categories do not exist');
    }
  }

  private rethrow(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002')
        throw new ConflictException(
          'Product code already exists, including soft-deleted products',
        );
      if (error.code === 'P2025')
        throw new NotFoundException('Product not found');
      if (error.code === 'P2003')
        throw new BadRequestException(
          'Manufacturer or category no longer exists',
        );
    }
    throw error;
  }
}
