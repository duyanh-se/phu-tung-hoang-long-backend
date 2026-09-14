import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { trimText } from '../../common/transformers/trim-text.transformer';

export class CreateManufacturerDto {
  @ApiProperty({ example: 'Honda', minLength: 1, maxLength: 200 })
  @Transform(trimText)
  @IsString()
  @Length(1, 200)
  name: string;
}
