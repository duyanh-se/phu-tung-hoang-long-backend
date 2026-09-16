import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, ValidateIf } from 'class-validator';
import { ContactRequestStatus } from '../../generated/prisma/enums';
import { CreateContactRequestDto } from './create-contact-request.dto';

export class UpdateContactRequestDto extends PartialType(
  CreateContactRequestDto,
  {
    skipNullProperties: false,
  },
) {
  @ApiPropertyOptional({
    enum: ContactRequestStatus,
    enumName: 'ContactRequestStatus',
  })
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsEnum(ContactRequestStatus)
  status?: ContactRequestStatus;
}
