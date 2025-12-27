import { PrismaService } from '../prisma/prisma.service';
export declare class FilterExamplesController {
    private prisma;
    constructor(prisma: PrismaService);
    notFoundExample(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    badRequestExample(data: {
        email?: string;
    }): {
        message: string;
    };
    duplicateEmailExample(data: {
        email: string;
        name: string;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteNonexistentExample(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    unexpectedErrorExample(): string | undefined;
    invalidForeignKeyExample(data: {
        userId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startsAt: Date;
        endsAt: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        clientName: string | null;
        barberId: string | null;
        userId: string | null;
        serviceId: string;
    }>;
    unauthorizedExample(): void;
    forbiddenExample(): void;
    validationExample(data: CreateUserDto): {
        message: string;
        data: CreateUserDto;
    };
}
declare class CreateUserDto {
    email: string;
    name: string;
    password: string;
    role: string;
}
export {};
