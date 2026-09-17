"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const node_crypto_1 = require("node:crypto");
const argon2 = __importStar(require("argon2"));
const client_1 = require("../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const user_select_1 = require("../users/user.select");
let AuthService = class AuthService {
    prisma;
    jwt;
    config;
    dummyHash = argon2.hash((0, node_crypto_1.randomBytes)(32).toString('hex'));
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async register(dto) {
        const passwordHash = await argon2.hash(dto.password);
        try {
            return await this.prisma.$transaction(async (tx) => {
                const user = await tx.user.create({
                    data: { email: dto.email, fullName: dto.fullName, passwordHash },
                    select: user_select_1.publicUserSelect,
                });
                return this.createSession(tx, user);
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002')
                throw new common_1.ConflictException('Email already registered');
            throw error;
        }
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        const matches = await argon2.verify(user?.passwordHash ?? (await this.dummyHash), dto.password);
        if (!user || !matches)
            throw new common_1.UnauthorizedException('Invalid email or password');
        const { id, email, fullName, role, createdAt, updatedAt } = user;
        return this.createSession(this.prisma, {
            id,
            email,
            fullName,
            role,
            createdAt,
            updatedAt,
        });
    }
    async refresh(token) {
        const hash = this.hashToken(token);
        const session = await this.prisma.session.findUnique({
            where: { refreshTokenHash: hash },
            include: { user: { select: user_select_1.publicUserSelect } },
        });
        if (!session || session.revokedAt || session.expiresAt <= new Date())
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        const refreshToken = (0, node_crypto_1.randomBytes)(32).toString('hex');
        const updated = await this.prisma.session.updateMany({
            where: {
                id: session.id,
                refreshTokenHash: hash,
                revokedAt: null,
                expiresAt: { gt: new Date() },
            },
            data: { refreshTokenHash: this.hashToken(refreshToken) },
        });
        if (updated.count !== 1)
            throw new common_1.UnauthorizedException('Refresh token already used or revoked');
        return this.tokenResponse(session.user, session.id, refreshToken);
    }
    async logout(sessionId) {
        await this.prisma.session.updateMany({
            where: { id: sessionId, revokedAt: null },
            data: { revokedAt: new Date() },
        });
    }
    async createSession(tx, user) {
        const refreshToken = (0, node_crypto_1.randomBytes)(32).toString('hex');
        const session = await tx.session.create({
            data: {
                userId: user.id,
                refreshTokenHash: this.hashToken(refreshToken),
                expiresAt: new Date(Date.now() +
                    this.config.getOrThrow('REFRESH_TOKEN_TTL_DAYS') * 86400000),
            },
        });
        return this.tokenResponse(user, session.id, refreshToken);
    }
    async tokenResponse(user, sessionId, refreshToken) {
        return {
            accessToken: await this.jwt.signAsync({ sub: user.id, sid: sessionId }),
            refreshToken,
            tokenType: 'Bearer',
            expiresIn: this.config.getOrThrow('JWT_ACCESS_TTL_SECONDS'),
            user,
        };
    }
    hashToken(token) {
        return (0, node_crypto_1.createHash)('sha256').update(token).digest('hex');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map