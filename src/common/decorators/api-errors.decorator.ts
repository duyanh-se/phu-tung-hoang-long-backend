import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error-response.dto';

export const ApiErrors = (...statuses: number[]) =>
  applyDecorators(
    ...statuses.map((status) =>
      ApiResponse({ status, type: ErrorResponseDto }),
    ),
  );
