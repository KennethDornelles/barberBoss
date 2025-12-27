import { ValidationOptions } from 'class-validator';
interface BusinessHoursOptions {
    startHour?: number;
    endHour?: number;
    workingDays?: number[];
}
export declare function IsBusinessHours(options?: BusinessHoursOptions, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export {};
