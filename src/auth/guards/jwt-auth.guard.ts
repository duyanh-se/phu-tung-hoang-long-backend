import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { isUUID } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { publicUserSelect } from '../../users/user.select';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { AuthenticatedRequest } from '../types/authenticated-request';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
    )
      return true;
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const match = /^Bearer ([^\s]+)$/i.exec(
      request.headers.authorization ?? '',
    );
    if (!match)
      throw new UnauthorizedException('Missing or invalid bearer token');
    let payload: { sub: string; sid: string };
    try {
      payload = await this.jwt.verifyAsync(match[1], {
        algorithms: ['HS256'],
        issuer: 'phu-tung-hoang-long-backend',
        audience: 'hoang-long-api',
      });
      if (!isUUID(payload.sub) || !isUUID(payload.sid))
        throw new Error('Invalid claims');
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
    const session = await this.prisma.session.findFirst({
      where: {
        id: payload.sid,
        userId: payload.sub,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      select: { user: { select: publicUserSelect } },
    });
    if (!session) throw new UnauthorizedException('Session expired or revoked');
    request.user = { ...session.user, sessionId: payload.sid };
    return true;
  }
}
