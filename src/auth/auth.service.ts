import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomBytes } from 'node:crypto';
import * as argon2 from 'argon2';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PublicUser, publicUserSelect } from '../users/user.select';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly dummyHash = argon2.hash(randomBytes(32).toString('hex'));
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const passwordHash = await argon2.hash(dto.password);
    try {
      return await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: { email: dto.email, fullName: dto.fullName, passwordHash },
          select: publicUserSelect,
        });
        return this.createSession(tx, user);
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      )
        throw new ConflictException('Email already registered');
      throw error;
    }
  }
  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    const matches = await argon2.verify(
      user?.passwordHash ?? (await this.dummyHash),
      dto.password,
    );
    if (!user || !matches)
      throw new UnauthorizedException('Invalid email or password');
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
  async refresh(token: string): Promise<AuthResponseDto> {
    const hash = this.hashToken(token);
    const session = await this.prisma.session.findUnique({
      where: { refreshTokenHash: hash },
      include: { user: { select: publicUserSelect } },
    });
    if (!session || session.revokedAt || session.expiresAt <= new Date())
      throw new UnauthorizedException('Invalid or expired refresh token');
    const refreshToken = randomBytes(32).toString('hex');
    // Atomic compare-and-swap prevents concurrent reuse of a refresh token.
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
      throw new UnauthorizedException('Refresh token already used or revoked');
    return this.tokenResponse(session.user, session.id, refreshToken);
  }
  async logout(sessionId: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: { id: sessionId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
  private async createSession(tx: Prisma.TransactionClient, user: PublicUser) {
    const refreshToken = randomBytes(32).toString('hex');
    const session = await tx.session.create({
      data: {
        userId: user.id,
        refreshTokenHash: this.hashToken(refreshToken),
        expiresAt: new Date(
          Date.now() +
            this.config.getOrThrow<number>('REFRESH_TOKEN_TTL_DAYS') * 86400000,
        ),
      },
    });
    return this.tokenResponse(user, session.id, refreshToken);
  }
  private async tokenResponse(
    user: PublicUser,
    sessionId: string,
    refreshToken: string,
  ): Promise<AuthResponseDto> {
    return {
      accessToken: await this.jwt.signAsync({ sub: user.id, sid: sessionId }),
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: this.config.getOrThrow<number>('JWT_ACCESS_TTL_SECONDS'),
      user,
    };
  }
  private hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }
}
