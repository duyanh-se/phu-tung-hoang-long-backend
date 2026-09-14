import { PartialType, PickType } from '@nestjs/swagger';
import { RegisterDto } from '../../auth/dto/register.dto';

export class UpdateProfileDto extends PartialType(
  PickType(RegisterDto, ['fullName'] as const),
  { skipNullProperties: false },
) {}
