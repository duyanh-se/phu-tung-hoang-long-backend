import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import {
  nullableTrimmedText,
  trimText,
} from '../../common/transformers/trim-text.transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'HL-OC-001', minLength: 1, maxLength: 100 })
  @Transform(trimText)
  @IsString()
  @Length(1, 100)
  code: string;

  @ApiPropertyOptional({
    type: String,
    nullable: true,
    example: 'Ốc vít',
    maxLength: 255,
  })
  @Transform(nullableTrimmedText)
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true, maxLength: 10000 })
  @Transform(nullableTrimmedText)
  @IsOptional()
  @IsString()
  @MaxLength(10000)
  description?: string | null;

  @ApiPropertyOptional({
    type: Number,
    nullable: true,
    example: 49140,
    minimum: 0,
    maximum: 999999999999.99,
    description:
      'Giá VNĐ, tối đa 2 chữ số thập phân. 0 hoặc null nghĩa là chưa có giá.',
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(0)
  @Max(999999999999.99)
  price?: number | null;

  @ApiPropertyOptional({
    type: String,
    nullable: true,
    example: '1744694197.jpg',
    maxLength: 2048,
    description:
      'Tên/path ảnh hoặc URL ảnh đã có; endpoint này không upload file.',
  })
  @Transform(nullableTrimmedText)
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  imagePath?: string | null;

  @ApiPropertyOptional({ type: String, format: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID()
  manufacturerId?: string | null;

  @ApiPropertyOptional({
    type: 'array',
    items: { type: 'string', format: 'uuid' },
    maxItems: 100,
    uniqueItems: true,
    description:
      'Các UUID danh mục. Khi PATCH, bỏ qua trường để giữ nguyên; [] để bỏ mọi danh mục; mảng mới thay thế toàn bộ danh sách.',
  })
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsArray()
  @ArrayMaxSize(100)
  @ArrayUnique()
  @IsUUID(undefined, { each: true })
  categoryIds?: string[];
}
