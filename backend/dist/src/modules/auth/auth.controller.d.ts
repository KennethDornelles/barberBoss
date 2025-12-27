import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { UserFromJwt } from './models/UserFromJwt';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    getProfile(user: UserFromJwt): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
