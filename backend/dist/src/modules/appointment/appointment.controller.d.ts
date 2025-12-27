import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { GetAvailableSlotsDto } from './dto/get-available-slots.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { AppointmentFilterDto } from './dto/appointment-filter.dto';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    create(createAppointmentDto: CreateAppointmentDto, user?: {
        id: string;
        role: string;
    }): Promise<import("./entities/appointment.entity").Appointment>;
    findAll(filter: AppointmentFilterDto, user: {
        id: string;
        role: string;
    }): Promise<import("../../common/interfaces/paginated-result.interface").PaginatedResult<import("./entities/appointment.entity").Appointment>>;
    findOne(id: string): Promise<import("./entities/appointment.entity").Appointment>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto, user: {
        id: string;
        role: string;
    }): Promise<import("./entities/appointment.entity").Appointment>;
    remove(id: string): Promise<import("./entities/appointment.entity").Appointment>;
    getAvailableSlots(query: GetAvailableSlotsDto): Promise<{
        slots: string[];
        businessHours: {
            openTime: string;
            closeTime: string;
        };
    }>;
    getClientHistory(clientName?: string, phone?: string, paginationDto?: PaginationDto): Promise<import("../../common/interfaces/paginated-result.interface").PaginatedResult<import("./entities/appointment.entity").Appointment>>;
}
