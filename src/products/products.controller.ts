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
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteProductResponseDto } from './dto/delete-product-response.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import {
  ProductListResponseDto,
  ProductResponseDto,
} from './dto/product-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@ApiErrors(400, 429)
@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Danh sách sản phẩm chưa xóa, phân trang và lọc' })
  @ApiOkResponse({ type: ProductListResponseDto })
  list(@Query() query: ProductQueryDto) {
    return this.products.list(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết sản phẩm chưa xóa' })
  @ApiOkResponse({ type: ProductResponseDto })
  @ApiErrors(404)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.products.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiErrors(401, 403, 409)
  @ApiOperation({ summary: '[ADMIN] Tạo sản phẩm, gán nhiều danh mục' })
  @ApiCreatedResponse({ type: ProductResponseDto })
  create(@Body() dto: CreateProductDto) {
    return this.products.create(dto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiErrors(401, 403, 404, 409)
  @ApiOperation({
    summary:
      '[ADMIN] Cập nhật sản phẩm; categoryIds thay thế toàn bộ danh mục khi được gửi',
  })
  @ApiOkResponse({ type: ProductResponseDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.products.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiErrors(401, 403, 404)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: DeleteProductResponseDto })
  @ApiOperation({
    summary: '[ADMIN] Xóa mềm sản phẩm, giữ mã hàng và liên kết danh mục',
  })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DeleteProductResponseDto> {
    await this.products.remove(id);
    return { message: 'delete success' };
  }
}
