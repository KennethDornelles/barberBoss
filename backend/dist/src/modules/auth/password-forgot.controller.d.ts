import { PasswordForgotService } from './password-forgot.service';
import { PasswordForgotDto } from './dto/password-forgot.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
export declare class PasswordForgotController {
    private readonly passwordForgotService;
    constructor(passwordForgotService: PasswordForgotService);
    forgot(dto: PasswordForgotDto): Promise<{
        message: string;
        token: string;
    }>;
    reset(dto: PasswordResetDto): Promise<{
        message: string;
    }>;
}
