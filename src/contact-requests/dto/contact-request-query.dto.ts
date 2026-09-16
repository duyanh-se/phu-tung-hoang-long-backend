import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { trimText } from '../../common/transformers/trim-text.transformer';
import { ContactRequestStatus } from '../../generated/prisma/enums';

export class ContactRequestQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Tìm theo họ tên, email hoặc số điện thoại đã chuẩn hóa',
    maxLength: 254,
  })
  @Transform(trimText)
  @IsOptional()
  @IsString()
  @MaxLength(254)
  search?: string;

  @ApiPropertyOptional({
    enum: ContactRequestStatus,
    enumName: 'ContactRequestStatus',
  })
  @IsOptional()
  @IsEnum(ContactRequestStatus)
  status?: ContactRequestStatus;
}
