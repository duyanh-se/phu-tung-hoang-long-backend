import { ApiProperty } from '@nestjs/swagger';

export class ProductImageUploadResponseDto {
  @ApiProperty({
    example: '/uploads/6f0c9b3e-5e84-4be2-8e59-e05a9bd2a2c9.webp',
  })
  imagePath: string;

  @ApiProperty({
    format: 'uri',
    example:
      'https://api.ptxmhoanglong.com/uploads/6f0c9b3e-5e84-4be2-8e59-e05a9bd2a2c9.webp',
  })
  imageUrl: string;
}
