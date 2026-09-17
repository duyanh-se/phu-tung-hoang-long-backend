import { Request } from 'express';
import { PublicUser } from '../../users/user.select';
export type AuthenticatedUser = PublicUser & {
    sessionId: string;
};
export interface AuthenticatedRequest extends Request {
    user: AuthenticatedUser;
}
