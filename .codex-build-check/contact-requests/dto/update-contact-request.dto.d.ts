import { ContactRequestStatus } from '../../generated/prisma/enums';
import { CreateContactRequestDto } from './create-contact-request.dto';
declare const UpdateContactRequestDto_base: import("@nestjs/common").Type<Partial<CreateContactRequestDto>>;
export declare class UpdateContactRequestDto extends UpdateContactRequestDto_base {
    status?: ContactRequestStatus;
}
export {};
