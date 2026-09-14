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
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiErrors } from '../common/decorators/api-errors.decorator';
import { Role } from '../generated/prisma/enums';
import { CategoriesService } from './categories.service';
import { CategoryQueryDto } from './dto/category-query.dto';
import {
  CategoryListResponseDto,
  CategoryResponseDto,
} from './dto/category-response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@ApiErrors(400, 429)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Danh sách danh mục một cấp, có phân trang' })
  @ApiOkResponse({ type: CategoryListResponseDto })
  list(@Query() query: CategoryQueryDto) {
    return this.categories.list(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết danh mục' })
  @ApiOkResponse({ type: CategoryResponseDto })
  @ApiErrors(404)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categories.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiErrors(401, 403)
  @ApiOperation({ summary: '[ADMIN] Tạo danh mục' })
  @ApiCreatedResponse({ type: CategoryResponseDto })
  create(@Body() dto: CreateCategoryDto) {
    return this.categories.create(dto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiErrors(401, 403, 404)
  @ApiOperation({ summary: '[ADMIN] Cập nhật danh mục' })
  @ApiOkResponse({ type: CategoryResponseDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categories.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiErrors(401, 403, 404, 409)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiOperation({
    summary: '[ADMIN] Xóa danh mục rỗng; chặn nếu còn liên kết sản phẩm',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categories.remove(id);
  }
}
