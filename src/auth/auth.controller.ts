import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ApiErrors } from '../common/decorators/api-errors.decorator';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import type { AuthenticatedUser } from './types/authenticated-request';

@ApiTags('Authentication')
@ApiErrors(400, 429)
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Public()
  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'Đăng ký tài khoản USER' })
  @ApiCreatedResponse({ type: AuthResponseDto })
  @ApiErrors(409)
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: 'Đăng nhập' })
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiErrors(401)
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Làm mới token (refresh token chỉ dùng một lần)' })
  @ApiOkResponse({ type: AuthResponseDto })
  @ApiErrors(401)
  refresh(@Body() dto: RefreshTokenDto) {
    return this.auth.refresh(dto.refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đăng xuất và thu hồi phiên hiện tại' })
  @ApiNoContentResponse()
  @ApiErrors(401)
  logout(@CurrentUser() user: AuthenticatedUser) {
    return this.auth.logout(user.sessionId);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy hồ sơ tài khoản đang đăng nhập' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiErrors(401)
  me(@CurrentUser() user: AuthenticatedUser): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
