import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { AppointmentStatus } from '@prisma/client';
export declare class IsUserIdXorClientNameForUpdateConstraint implements ValidatorConstraintInterface {
    validate(value: unknown, args: ValidationArguments): boolean;
    defaultMessage(): string;
}
export declare class UpdateAppointmentDto {
    userId?: string | null;
    clientName?: string | null;
    serviceId?: string;
    startsAt?: string;
    endsAt?: string;
    status?: AppointmentStatus;
    timezone?: string;
}
