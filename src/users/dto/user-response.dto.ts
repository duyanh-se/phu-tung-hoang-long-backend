import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../generated/prisma/enums';

export class UserResponseDto {
  @ApiProperty({ format: 'uuid' }) id: string;
  @ApiProperty({ example: 'customer@example.com' }) email: string;
  @ApiProperty({ example: 'Nguyễn Văn An' }) fullName: string;
  @ApiProperty({ enum: Role, enumName: 'Role' }) role: Role;
  @ApiProperty({ type: String, format: 'date-time' }) createdAt: Date;
  @ApiProperty({ type: String, format: 'date-time' }) updatedAt: Date;
}

export class UserListResponseDto {
  @ApiProperty({ type: [UserResponseDto] }) data: UserResponseDto[];
  @ApiProperty() total: number;
  @ApiProperty() page: number;
  @ApiProperty() limit: number;
  @ApiProperty() totalPages: number;
}
