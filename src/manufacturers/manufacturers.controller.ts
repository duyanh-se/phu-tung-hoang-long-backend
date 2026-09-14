import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { ManufacturerQueryDto } from './dto/manufacturer-query.dto';
import {
  DeleteManufacturerResponseDto,
  ManufacturerListResponseDto,
  ManufacturerResponseDto,
} from './dto/manufacturer-response.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { ManufacturersService } from './manufacturers.service';

@ApiTags('Manufacturers')
@ApiErrors(400, 429)
@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturers: ManufacturersService) {}

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Danh sách hãng sản xuất, phân trang và tìm theo tên',
  })
  @ApiOkResponse({ type: ManufacturerListResponseDto })
  list(@Query() query: ManufacturerQueryDto) {
    return this.manufacturers.list(query);
  }

  @Public()
  @Get(':id')
  @ApiErrors(404)
  @ApiOperation({ summary: 'Chi tiết hãng sản xuất' })
  @ApiOkResponse({ type: ManufacturerResponseDto })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.manufacturers.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiErrors(401, 403)
  @ApiOperation({ summary: '[ADMIN] Tạo hãng sản xuất' })
  @ApiCreatedResponse({ type: ManufacturerResponseDto })
  create(@Body() dto: CreateManufacturerDto) {
    return this.manufacturers.create(dto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiErrors(401, 403, 404)
  @ApiOperation({ summary: '[ADMIN] Cập nhật tên hãng sản xuất' })
  @ApiOkResponse({ type: ManufacturerResponseDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateManufacturerDto,
  ) {
    return this.manufacturers.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiErrors(401, 403, 404, 409)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '[ADMIN] Xóa hãng; chặn khi còn sản phẩm, kể cả đã xóa mềm',
  })
  @ApiOkResponse({ type: DeleteManufacturerResponseDto })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DeleteManufacturerResponseDto> {
    await this.manufacturers.remove(id);
    return { message: 'delete success' };
  }
}
