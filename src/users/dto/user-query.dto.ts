import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { trimText } from '../../common/transformers/trim-text.transformer';
import { Role } from '../../generated/prisma/enums';

export class UserQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Tìm theo họ tên hoặc email người dùng',
    maxLength: 254,
  })
  @Transform(trimText)
  @IsOptional()
  @IsString()
  @MaxLength(254)
  search?: string;

  @ApiPropertyOptional({ enum: Role, enumName: 'Role' })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
