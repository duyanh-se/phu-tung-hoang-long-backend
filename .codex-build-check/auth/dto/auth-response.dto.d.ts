import { UserResponseDto } from '../../users/dto/user-response.dto';
export declare class AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    user: UserResponseDto;
}
