import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import {
  nullableTrimmedText,
  trimText,
} from '../../common/transformers/trim-text.transformer';

export class CreateContactRequestDto {
  @ApiProperty({ example: 'Nguyễn Văn An', minLength: 1, maxLength: 100 })
  @Transform(trimText)
  @IsString()
  @Length(1, 100)
  fullName: string;

  @ApiProperty({
    example: 'guest@example.com',
    format: 'email',
    maxLength: 254,
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  @MaxLength(254)
  email: string;

  @ApiProperty({
    example: '0901234567',
    type: String,
    maxLength: 16,
    pattern: '^\\+?[0-9]{7,15}$',
    description:
      'Chuỗi 7–15 chữ số, có thể bắt đầu bằng +. Bỏ khoảng trắng, dấu chấm, gạch ngang và ngoặc trước khi lưu; giữ số 0 đầu.',
  })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.replace(/[\s().-]/g, '') : value,
  )
  @IsString()
  @Matches(/^\+?[0-9]{7,15}$/)
  phoneNumber: string;

  @ApiPropertyOptional({
    type: String,
    nullable: true,
    maxLength: 200,
    example: 'Tư vấn sản phẩm',
    description:
      'Lý do do frontend gửi lên; bỏ qua, null hoặc chuỗi trắng được lưu null.',
  })
  @Transform(nullableTrimmedText)
  @IsOptional()
  @IsString()
  @MaxLength(200)
  reason?: string | null;
}
