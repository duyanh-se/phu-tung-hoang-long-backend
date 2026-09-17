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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const user_select_1 = require("./user.select");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list({ page, limit }) {
        const [data, total] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                select: user_select_1.publicUserSelect,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
            }),
            this.prisma.user.count(),
        ], { isolationLevel: client_1.Prisma.TransactionIsolationLevel.RepeatableRead });
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: user_select_1.publicUserSelect,
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    updateProfile(id, dto) {
        return this.update(id, { fullName: dto.fullName });
    }
    updateRole(id, role, actorId) {
        if (id === actorId)
            throw new common_1.BadRequestException('You cannot change your own role');
        return this.update(id, { role });
    }
    async update(id, data) {
        try {
            return await this.prisma.user.update({
                where: { id },
                data,
                select: user_select_1.publicUserSelect,
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025')
                throw new common_1.NotFoundException('User not found');
            throw error;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map