import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import type { AuthenticatedUser } from '../auth/types/authenticated-request';
import { ApiErrors } from '../common/decorators/api-errors.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Role } from '../generated/prisma/enums';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UserListResponseDto, UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@ApiTags('Users & Authorization')
@ApiBearerAuth()
@ApiErrors(400, 401, 403, 429)
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}
  @Patch('me')
  @ApiOperation({ summary: 'Cập nhật hồ sơ cá nhân' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiErrors(404)
  updateMe(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.users.updateProfile(user.id, dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: '[ADMIN] Danh sách người dùng có phân trang' })
  @ApiOkResponse({ type: UserListResponseDto })
  list(@Query() query: PaginationQueryDto) {
    return this.users.list(query);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: '[ADMIN] Xem người dùng theo ID' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiErrors(404)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.users.findOne(id);
  }

  @Patch(':id/role')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary:
      '[ADMIN] Đổi vai trò người dùng (không cho đổi vai trò của chính mình)',
  })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiErrors(404)
  updateRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRoleDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.users.updateRole(id, dto.role, user.id);
  }
}
