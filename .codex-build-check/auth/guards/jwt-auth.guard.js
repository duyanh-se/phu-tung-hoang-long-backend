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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const class_validator_1 = require("class-validator");
const prisma_service_1 = require("../../prisma/prisma.service");
const user_select_1 = require("../../users/user.select");
const public_decorator_1 = require("../decorators/public.decorator");
let JwtAuthGuard = class JwtAuthGuard {
    reflector;
    jwt;
    prisma;
    constructor(reflector, jwt, prisma) {
        this.reflector = reflector;
        this.jwt = jwt;
        this.prisma = prisma;
    }
    async canActivate(context) {
        if (this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]))
            return true;
        const request = context.switchToHttp().getRequest();
        const match = /^Bearer ([^\s]+)$/i.exec(request.headers.authorization ?? '');
        if (!match)
            throw new common_1.UnauthorizedException('Missing or invalid bearer token');
        let payload;
        try {
            payload = await this.jwt.verifyAsync(match[1], {
                algorithms: ['HS256'],
                issuer: 'phu-tung-hoang-long-backend',
                audience: 'hoang-long-api',
            });
            if (!(0, class_validator_1.isUUID)(payload.sub) || !(0, class_validator_1.isUUID)(payload.sid))
                throw new Error('Invalid claims');
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired access token');
        }
        const session = await this.prisma.session.findFirst({
            where: {
                id: payload.sid,
                userId: payload.sub,
                revokedAt: null,
                expiresAt: { gt: new Date() },
            },
            select: { user: { select: user_select_1.publicUserSelect } },
        });
        if (!session)
            throw new common_1.UnauthorizedException('Session expired or revoked');
        request.user = { ...session.user, sessionId: payload.sid };
        return true;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map