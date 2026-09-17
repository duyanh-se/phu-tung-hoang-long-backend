import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
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

  @ApiPropertyOptional({
    enum: ['newest', 'price_asc', 'price_desc'],
    default: 'newest',
  })
  @IsOptional()
  @IsIn(['newest', 'price_asc', 'price_desc'])
  sort?: 'newest' | 'price_asc' | 'price_desc';

  @ApiPropertyOptional({
    type: Number,
    minimum: 0,
    maximum: 999999999999.99,
    description: 'Giá tối thiểu (VNĐ), bao gồm biên',
  })
  @Transform(({ value }) =>
    typeof value === 'string' && /^\d+(\.\d{1,2})?$/.test(value)
      ? Number(value)
      : value,
  )
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(0)
  @Max(999999999999.99)
  minPrice?: number;

  @ApiPropertyOptional({
    type: Number,
    minimum: 0,
    maximum: 999999999999.99,
    description: 'Giá tối đa (VNĐ), bao gồm biên',
  })
  @Transform(({ value }) =>
    typeof value === 'string' && /^\d+(\.\d{1,2})?$/.test(value)
      ? Number(value)
      : value,
  )
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(0)
  @Max(999999999999.99)
  maxPrice?: number;
}
