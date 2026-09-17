import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiErrors } from '../common/decorators/api-errors.decorator';
import { Role } from '../generated/prisma/enums';
import { ProductImageUploadResponseDto } from './dto/product-image-upload-response.dto';
import { UploadsService } from './uploads.service';

type UploadedImageFile = {
  buffer: Buffer;
  mimetype: string;
};

@ApiTags('Uploads')
@ApiErrors(400, 401, 403, 413, 429)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploads: UploadsService) {}

  @Post('products')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 0 },
    }),
  )
  @ApiOperation({
    summary: '[ADMIN] Tải ảnh sản phẩm (JPG, PNG hoặc WebP; tối đa 5 MB)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiCreatedResponse({ type: ProductImageUploadResponseDto })
  uploadProductImage(@UploadedFile() file: UploadedImageFile | undefined) {
    return this.uploads.saveProductImage(file);
  }
}
