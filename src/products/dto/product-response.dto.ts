import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from '../../categories/dto/category-response.dto';

export class ProductManufacturerDto {
  @ApiProperty({ format: 'uuid' }) id: string;
  @ApiProperty() name: string;
}

export class ProductResponseDto {
  @ApiProperty({ format: 'uuid' }) id: string;
  @ApiProperty({ example: 'HL-OC-001' }) code: string;
  @ApiProperty({ type: String, nullable: true }) name: string | null;
  @ApiProperty({ type: String, nullable: true }) description: string | null;
  @ApiProperty({
    type: String,
    nullable: true,
    example: '49140',
    description:
      'Giá trả dạng chuỗi decimal để giữ chính xác; null là chưa có giá.',
  })
  price: string | null;
  @ApiProperty({ example: 'VND' }) currency: string;
  @ApiProperty({ type: String, nullable: true }) imagePath: string | null;
  @ApiProperty({
    type: String,
    format: 'uri',
    nullable: true,
    readOnly: true,
    example: 'https://tvthanh.name.vn/public/templates/uploads/1744694197.jpg',
    description: 'URL ảnh đầy đủ từ imagePath; null khi chưa có ảnh.',
  })
  imageUrl: string | null;
  @ApiProperty({ type: String, format: 'uuid', nullable: true })
  manufacturerId: string | null;
  @ApiProperty({ type: ProductManufacturerDto, nullable: true })
  manufacturer: ProductManufacturerDto | null;
  @ApiProperty({ type: [CategoryResponseDto] })
  categories: CategoryResponseDto[];
  @ApiProperty({ type: String, format: 'date-time' }) createdAt: Date;
  @ApiProperty({ type: String, format: 'date-time' }) updatedAt: Date;
}

export class ProductListResponseDto {
  @ApiProperty({ type: [ProductResponseDto] }) data: ProductResponseDto[];
  @ApiProperty({ type: 'integer' }) total: number;
  @ApiProperty({ type: 'integer' }) page: number;
  @ApiProperty({ type: 'integer' }) limit: number;
  @ApiProperty({ type: 'integer' }) totalPages: number;
}
