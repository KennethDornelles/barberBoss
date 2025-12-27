import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { AppointmentStatus } from '@prisma/client';
export declare class IsUserIdXorClientNameConstraint implements ValidatorConstraintInterface {
    validate(value: unknown, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): "Forneça APENAS userId (cliente cadastrado) OU clientName (agendamento manual), não ambos." | "É necessário fornecer userId (cliente cadastrado) ou clientName (agendamento manual).";
}
export declare class CreateAppointmentDto {
    userId?: string;
    clientName?: string;
    barberId: string;
    serviceId: string;
    startsAt: string;
    endsAt?: string;
    status?: AppointmentStatus;
    timezone?: string;
}
