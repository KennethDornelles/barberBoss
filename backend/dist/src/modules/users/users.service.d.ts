import { PrismaService } from '../../prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    updateRole(userId: string, role: Role): Promise<User>;
    findAll(role?: string, limit?: number, offset?: number): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    create(dto: CreateUserDto): Promise<User>;
    update(id: string, dto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
}
