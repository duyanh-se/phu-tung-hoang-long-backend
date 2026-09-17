"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const product_select_1 = require("./product.select");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list({ page, limit, search, categoryId, manufacturerId, sort, minPrice, maxPrice, }) {
        if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice)
            throw new common_1.BadRequestException('Giá tối thiểu không được lớn hơn giá tối đa.');
        const where = {
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
            ...(minPrice !== undefined || maxPrice !== undefined
                ? { price: { gte: minPrice, lte: maxPrice } }
                : {}),
        };
        const [products, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: sort === 'price_asc' || sort === 'price_desc'
                    ? [
                        {
                            price: {
                                sort: sort === 'price_asc' ? 'asc' : 'desc',
                                nulls: 'last',
                            },
                        },
                        { id: 'asc' },
                    ]
                    : [{ createdAt: 'desc' }, { id: 'desc' }],
                select: product_select_1.productSelect,
            }),
            this.prisma.product.count({ where }),
        ], { isolationLevel: client_1.Prisma.TransactionIsolationLevel.RepeatableRead });
        return {
            data: products.map(product_select_1.toProductResponse),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id, deletedAt: null },
            select: product_select_1.productSelect,
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return (0, product_select_1.toProductResponse)(product);
    }
    async create(dto) {
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
                    select: product_select_1.productSelect,
                });
            });
            return (0, product_select_1.toProductResponse)(product);
        }
        catch (error) {
            this.rethrow(error);
        }
    }
    async update(id, dto) {
        try {
            const product = await this.prisma.$transaction(async (tx) => {
                if (!(await tx.product.findUnique({
                    where: { id, deletedAt: null },
                    select: { id: true },
                })))
                    throw new common_1.NotFoundException('Product not found');
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
                    select: product_select_1.productSelect,
                });
            });
            return (0, product_select_1.toProductResponse)(product);
        }
        catch (error) {
            this.rethrow(error);
        }
    }
    async remove(id) {
        try {
            await this.prisma.product.update({
                where: { id, deletedAt: null },
                data: { deletedAt: new Date() },
            });
        }
        catch (error) {
            this.rethrow(error);
        }
    }
    fields(dto) {
        return {
            code: dto.code,
            name: dto.name,
            description: dto.description,
            price: dto.price === undefined
                ? undefined
                : dto.price === null || dto.price === 0
                    ? null
                    : new client_1.Prisma.Decimal(dto.price.toString()),
            imagePath: dto.imagePath,
            manufacturerId: dto.manufacturerId,
        };
    }
    async validateReferences(tx, dto) {
        if (dto.manufacturerId &&
            !(await tx.manufacturer.findUnique({
                where: { id: dto.manufacturerId },
                select: { id: true },
            })))
            throw new common_1.BadRequestException('Manufacturer not found');
        if (dto.categoryIds?.length) {
            const count = await tx.category.count({
                where: { id: { in: dto.categoryIds } },
            });
            if (count !== dto.categoryIds.length)
                throw new common_1.BadRequestException('One or more categories do not exist');
        }
    }
    rethrow(error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002')
                throw new common_1.ConflictException('Product code already exists, including soft-deleted products');
            if (error.code === 'P2025')
                throw new common_1.NotFoundException('Product not found');
            if (error.code === 'P2003')
                throw new common_1.BadRequestException('Manufacturer or category no longer exists');
        }
        throw error;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map