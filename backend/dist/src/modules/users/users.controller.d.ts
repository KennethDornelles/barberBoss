import type { Request } from 'express';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    updateUserRole(id: string, dto: UpdateUserRoleDto): Promise<{
        message: string;
        user: User;
    }>;
    findAll(req: Request, limit?: number, offset?: number, role?: string): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(dto: CreateUserDto): Promise<User>;
    update(id: string, dto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
}
