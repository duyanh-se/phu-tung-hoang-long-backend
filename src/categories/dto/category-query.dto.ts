import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { trimText } from '../../common/transformers/trim-text.transformer';

export class CategoryQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Tìm theo tên danh mục', maxLength: 200 })
  @Transform(trimText)
  @IsOptional()
  @IsString()
  @MaxLength(200)
  search?: string;
}
