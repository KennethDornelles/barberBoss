import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { SettingsService } from '../settings/settings.service';
import { TimeBlockService } from '../time-block/time-block.service';
import { Appointment } from './entities/appointment.entity';
import { PaginatedResult } from '../../common/interfaces/paginated-result.interface';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class AppointmentService {
    private readonly prisma;
    private readonly settingsService;
    private readonly timeBlockService;
    constructor(prisma: PrismaService, settingsService: SettingsService, timeBlockService: TimeBlockService);
    private validateBusinessHours;
    create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    findAll(paginationDto?: PaginationDto): Promise<PaginatedResult<Appointment>>;
    findOne(id: string): Promise<Appointment>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment>;
    remove(id: string): Promise<Appointment>;
    findByDate(date: Date, paginationDto?: PaginationDto): Promise<PaginatedResult<Appointment>>;
    findByUser(userId: string, paginationDto?: PaginationDto): Promise<PaginatedResult<Appointment>>;
    findByBarber(barberId: string, paginationDto?: PaginationDto): Promise<PaginatedResult<Appointment>>;
    findByStatus(status: string, paginationDto?: PaginationDto): Promise<PaginatedResult<Appointment>>;
    getAvailableSlots(date: string, serviceId: string): Promise<{
        slots: string[];
        businessHours: {
            openTime: string;
            closeTime: string;
        };
    }>;
    getClientHistory(clientName?: string, phone?: string, paginationDto?: PaginationDto): Promise<PaginatedResult<Appointment>>;
}
