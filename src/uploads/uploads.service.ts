import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mkdir, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { productImageUrl } from '../products/product-image';
import { ProductImageUploadResponseDto } from './dto/product-image-upload-response.dto';

const maxImageSize = 5 * 1024 * 1024;

type UploadedFile = {
  buffer: Buffer;
  mimetype: string;
};

type ImageFormat = {
  extension: 'jpg' | 'png' | 'webp';
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp';
};

function imageFormat(buffer: Buffer): ImageFormat | null {
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  )
    return { extension: 'jpg', mimeType: 'image/jpeg' };
  if (
    buffer.length >= 8 &&
    buffer
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  )
    return { extension: 'png', mimeType: 'image/png' };
  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  )
    return { extension: 'webp', mimeType: 'image/webp' };
  return null;
}

@Injectable()
export class UploadsService {
  constructor(private readonly config: ConfigService) {}

  async saveProductImage(
    file: UploadedFile | undefined,
  ): Promise<ProductImageUploadResponseDto> {
    if (!file?.buffer.length)
      throw new BadRequestException('Vui lòng chọn một tệp ảnh.');
    if (file.buffer.length > maxImageSize)
      throw new BadRequestException('Ảnh không được vượt quá 5 MB.');

    const format = imageFormat(file.buffer);
    if (!format || file.mimetype !== format.mimeType)
      throw new BadRequestException(
        'Chỉ chấp nhận ảnh JPG, PNG hoặc WebP hợp lệ.',
      );

    const directory = resolve(
      this.config.get<string>('UPLOAD_DIR') ?? 'uploads',
    );
    await mkdir(directory, { recursive: true });

    const imagePath = `/uploads/${randomUUID()}.${format.extension}`;
    await writeFile(
      resolve(directory, imagePath.slice('/uploads/'.length)),
      file.buffer,
      {
        flag: 'wx',
      },
    );

    return {
      imagePath,
      imageUrl: productImageUrl(imagePath)!,
    };
  }
}
