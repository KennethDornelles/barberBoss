import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    create(createServiceDto: CreateServiceDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        durationMin: number;
        barberCommission: import("@prisma/client/runtime/library").Decimal | null;
        active: boolean;
    }>;
    findAll(paginationDto: PaginationDto): Promise<import("../../common/interfaces/paginated-result.interface").PaginatedResult<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        durationMin: number;
        barberCommission: import("@prisma/client/runtime/library").Decimal | null;
        active: boolean;
    }>>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        durationMin: number;
        barberCommission: import("@prisma/client/runtime/library").Decimal | null;
        active: boolean;
    }>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        durationMin: number;
        barberCommission: import("@prisma/client/runtime/library").Decimal | null;
        active: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        durationMin: number;
        barberCommission: import("@prisma/client/runtime/library").Decimal | null;
        active: boolean;
    }>;
}
