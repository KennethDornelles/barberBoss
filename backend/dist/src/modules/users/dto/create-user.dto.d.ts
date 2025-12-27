export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: 'CLIENT' | 'BARBER' | 'ADMIN';
}
