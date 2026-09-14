import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Public } from './auth/decorators/public.decorator';

class HealthResponseDto {
  @ApiProperty({ example: 'ok' }) status: string;
}

@ApiTags('Health')
@Controller('health')
export class AppController {
  @Public()
  @Get()
  @ApiOkResponse({ type: HealthResponseDto })
  health(): HealthResponseDto {
    return { status: 'ok' };
  }
}
