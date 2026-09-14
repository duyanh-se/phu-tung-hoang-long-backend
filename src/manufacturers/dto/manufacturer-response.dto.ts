import { ApiProperty } from '@nestjs/swagger';

export class ManufacturerResponseDto {
  @ApiProperty({ format: 'uuid' }) id: string;
  @ApiProperty({ example: 'Honda' }) name: string;
  @ApiProperty({ type: String, format: 'date-time' }) createdAt: Date;
  @ApiProperty({ type: String, format: 'date-time' }) updatedAt: Date;
}

export class ManufacturerListResponseDto {
  @ApiProperty({ type: [ManufacturerResponseDto] })
  data: ManufacturerResponseDto[];
  @ApiProperty({ type: 'integer' }) total: number;
  @ApiProperty({ type: 'integer' }) page: number;
  @ApiProperty({ type: 'integer' }) limit: number;
  @ApiProperty({ type: 'integer' }) totalPages: number;
}

export class DeleteManufacturerResponseDto {
  @ApiProperty({ example: 'delete success' }) message: string;
}
