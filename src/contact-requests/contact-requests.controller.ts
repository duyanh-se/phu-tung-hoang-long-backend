import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiErrors } from '../common/decorators/api-errors.decorator';
import { Role } from '../generated/prisma/enums';
import { ContactRequestsService } from './contact-requests.service';
import { ContactRequestQueryDto } from './dto/contact-request-query.dto';
import {
  ContactRequestListResponseDto,
  ContactRequestResponseDto,
  DeleteContactRequestResponseDto,
} from './dto/contact-request-response.dto';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';
import { UpdateContactRequestDto } from './dto/update-contact-request.dto';

@ApiTags('Contact requests')
@ApiErrors(400, 429)
@Controller('contact-requests')
export class ContactRequestsController {
  constructor(private readonly contacts: ContactRequestsService) {}

  @Post()
  @Public()
  @ApiOperation({
    summary: 'Gửi yêu cầu liên hệ, không cần đăng nhập; trạng thái ban đầu NEW',
  })
  @ApiCreatedResponse({ type: ContactRequestResponseDto })
  create(@Body() dto: CreateContactRequestDto) {
    return this.contacts.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiErrors(401, 403)
  @ApiOperation({
    summary: '[ADMIN] Danh sách yêu cầu liên hệ, tìm kiếm và lọc trạng thái',
  })
  @ApiOkResponse({ type: ContactRequestListResponseDto })
  list(@Query() query: ContactRequestQueryDto) {
    return this.contacts.list(query);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiErrors(401, 403, 404)
  @ApiOperation({ summary: '[ADMIN] Chi tiết yêu cầu liên hệ' })
  @ApiOkResponse({ type: ContactRequestResponseDto })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.contacts.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiErrors(401, 403, 404)
  @ApiOperation({
    summary: '[ADMIN] Sửa thông tin hoặc trạng thái yêu cầu liên hệ',
  })
  @ApiOkResponse({ type: ContactRequestResponseDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateContactRequestDto,
  ) {
    return this.contacts.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiErrors(401, 403, 404)
  @ApiOperation({ summary: '[ADMIN] Xóa vĩnh viễn yêu cầu liên hệ' })
  @ApiOkResponse({ type: DeleteContactRequestResponseDto })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DeleteContactRequestResponseDto> {
    await this.contacts.remove(id);
    return { message: 'delete success' };
  }
}
