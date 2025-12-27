import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Service } from '@prisma/client';
export declare class ServiceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createServiceDto: CreateServiceDto): Promise<Service>;
    findAll(paginationDto?: PaginationDto): Promise<PaginatedResult<Service>>;
    findOne(id: string): Promise<Service>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service>;
    remove(id: string): Promise<Service>;
}
