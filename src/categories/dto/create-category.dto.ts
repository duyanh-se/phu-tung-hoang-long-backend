import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, Length, MaxLength } from 'class-validator';
import {
  nullableTrimmedText,
  trimText,
} from '../../common/transformers/trim-text.transformer';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Phụ tùng động cơ', minLength: 1, maxLength: 200 })
  @Transform(trimText)
  @IsString()
  @Length(1, 200)
  name: string;

  @ApiPropertyOptional({ type: String, nullable: true, maxLength: 5000 })
  @Transform(nullableTrimmedText)
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string | null;
}
