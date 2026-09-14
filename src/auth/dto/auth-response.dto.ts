import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class AuthResponseDto {
  @ApiProperty() accessToken: string;
  @ApiProperty() refreshToken: string;
  @ApiProperty({ example: 'Bearer' }) tokenType: string;
  @ApiProperty({
    example: 900,
    description: 'Thời hạn access token, tính bằng giây.',
  })
  expiresIn: number;
  @ApiProperty({ type: UserResponseDto }) user: UserResponseDto;
}
