import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { trimText } from '../../common/transformers/trim-text.transformer';

export class ProductQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Tìm theo mã hoặc tên sản phẩm',
    maxLength: 200,
  })
  @Transform(trimText)
  @IsOptional()
  @IsString()
  @MaxLength(200)
  search?: string;

  @ApiPropertyOptional({ format: 'uuid', description: 'Lọc theo một danh mục' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  manufacturerId?: string;
}
