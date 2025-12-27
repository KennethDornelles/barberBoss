import { Role } from '@prisma/client';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<User>);
}
