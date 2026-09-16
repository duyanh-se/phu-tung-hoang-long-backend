import { ApiProperty } from '@nestjs/swagger';
import { ContactRequestStatus } from '../../generated/prisma/enums';

export class ContactRequestResponseDto {
  @ApiProperty({ format: 'uuid' }) id: string;
  @ApiProperty({ example: 'Nguyễn Văn An' }) fullName: string;
  @ApiProperty({ example: 'guest@example.com', format: 'email' }) email: string;
  @ApiProperty({ example: '0901234567' }) phoneNumber: string;
  @ApiProperty({ type: String, nullable: true }) reason: string | null;
  @ApiProperty({ enum: ContactRequestStatus, enumName: 'ContactRequestStatus' })
  status: ContactRequestStatus;
  @ApiProperty({ type: String, format: 'date-time' }) createdAt: Date;
  @ApiProperty({ type: String, format: 'date-time' }) updatedAt: Date;
}

export class ContactRequestListResponseDto {
  @ApiProperty({ type: [ContactRequestResponseDto] })
  data: ContactRequestResponseDto[];
  @ApiProperty({ type: 'integer' }) total: number;
  @ApiProperty({ type: 'integer' }) page: number;
  @ApiProperty({ type: 'integer' }) limit: number;
  @ApiProperty({ type: 'integer' }) totalPages: number;
}

export class DeleteContactRequestResponseDto {
  @ApiProperty({ example: 'delete success' }) message: string;
}
