import { PickType, ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { RegisterDto } from './register.dto';

export class LoginDto extends PickType(RegisterDto, ['email'] as const) {
  @ApiProperty({
    format: 'password',
    example: 'StrongPassword123!',
    maxLength: 128,
  })
  @IsString()
  @Length(1, 128)
  password: string;
}
