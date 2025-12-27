import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordForgotDto } from './dto/password-forgot.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { BrevoService } from './brevo.service';
export declare class PasswordForgotService {
    private readonly prisma;
    private readonly jwtService;
    private readonly brevoService;
    constructor(prisma: PrismaService, jwtService: JwtService, brevoService: BrevoService);
    requestPasswordReset(dto: PasswordForgotDto): Promise<{
        message: string;
        token: string;
    }>;
    resetPassword(dto: PasswordResetDto): Promise<{
        message: string;
    }>;
}
