import { Prisma } from '../generated/prisma/client';
export declare const publicUserSelect: {
    id: true;
    email: true;
    fullName: true;
    role: true;
    createdAt: true;
    updatedAt: true;
};
export type PublicUser = Prisma.UserGetPayload<{
    select: typeof publicUserSelect;
}>;
