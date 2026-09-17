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
exports.ManufacturersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const manufacturerSelect = {
    id: true,
    name: true,
    createdAt: true,
    updatedAt: true,
};
let ManufacturersService = class ManufacturersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.manufacturer.create({
            data: { name: dto.name },
            select: manufacturerSelect,
        });
    }
    async list({ page, limit, search }) {
        const where = search
            ? { name: { contains: search, mode: 'insensitive' } }
            : {};
        const [data, total] = await this.prisma.$transaction([
            this.prisma.manufacturer.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
                select: manufacturerSelect,
            }),
            this.prisma.manufacturer.count({ where }),
        ], { isolationLevel: client_1.Prisma.TransactionIsolationLevel.RepeatableRead });
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const manufacturer = await this.prisma.manufacturer.findUnique({
            where: { id },
            select: manufacturerSelect,
        });
        if (!manufacturer)
            throw new common_1.NotFoundException('Manufacturer not found');
        return manufacturer;
    }
    async update(id, dto) {
        try {
            return await this.prisma.manufacturer.update({
                where: { id },
                data: { name: dto.name },
                select: manufacturerSelect,
            });
        }
        catch (error) {
            this.rethrow(error);
        }
    }
    async remove(id) {
        try {
            await this.prisma.manufacturer.delete({ where: { id } });
        }
        catch (error) {
            this.rethrow(error);
        }
    }
    rethrow(error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025')
                throw new common_1.NotFoundException('Manufacturer not found');
            if (error.code === 'P2003')
                throw new common_1.ConflictException('Manufacturer still contains products, including soft-deleted products. Remove product links before deleting it.');
        }
        throw error;
    }
};
exports.ManufacturersService = ManufacturersService;
exports.ManufacturersService = ManufacturersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ManufacturersService);
//# sourceMappingURL=manufacturers.service.js.map