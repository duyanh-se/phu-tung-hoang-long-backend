import { RegisterDto } from './register.dto';
declare const LoginDto_base: import("@nestjs/common").Type<Pick<RegisterDto, "email">>;
export declare class LoginDto extends LoginDto_base {
    password: string;
}
export {};
