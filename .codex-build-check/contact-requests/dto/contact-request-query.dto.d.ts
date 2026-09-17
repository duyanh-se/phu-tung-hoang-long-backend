import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ContactRequestStatus } from '../../generated/prisma/enums';
export declare class ContactRequestQueryDto extends PaginationQueryDto {
    search?: string;
    status?: ContactRequestStatus;
}
