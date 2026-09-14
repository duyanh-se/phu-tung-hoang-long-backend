import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token nhận từ register, login hoặc refresh.',
    minLength: 64,
    maxLength: 64,
  })
  @IsString()
  @Matches(/^[a-f0-9]{64}$/)
  refreshToken: string;
}
