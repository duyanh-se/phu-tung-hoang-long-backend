import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length, Matches, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'customer@example.com', maxLength: 254 })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  @MaxLength(254)
  email: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    minLength: 8,
    maxLength: 128,
    format: 'password',
    description: 'Ít nhất một chữ thường, một chữ hoa và một chữ số.',
  })
  @IsString()
  @Length(8, 128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]+$/)
  password: string;

  @ApiProperty({ example: 'Nguyễn Văn An', minLength: 2, maxLength: 100 })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @Length(2, 100)
  fullName: string;
}
