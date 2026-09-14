import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
  // Explicit types prevent Swagger from treating initialized numbers as objects.
  @ApiPropertyOptional({
    type: 'integer',
    default: 1,
    minimum: 1,
    maximum: 1000000,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000000)
  page: number = 1;

  @ApiPropertyOptional({
    type: 'integer',
    default: 20,
    minimum: 1,
    maximum: 100,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 20;
}
