import type { Dayjs, ManipulateType, QUnitType, OpUnitType } from 'dayjs';
export declare class DateUtil {
    static now(): Dayjs;
    static toLocalTimezone(date: string | Date | Dayjs): Dayjs;
    static toUTC(date: string | Date | Dayjs): Dayjs;
    static formatBR(date: string | Date | Dayjs): string;
    static formatISO(date: string | Date | Dayjs): string;
    static isValid(date: string | Date | Dayjs): boolean;
    static add(date: string | Date | Dayjs, amount: number, unit: ManipulateType): Dayjs;
    static subtract(date: string | Date | Dayjs, amount: number, unit: ManipulateType): Dayjs;
    static isBefore(date1: string | Date | Dayjs, date2: string | Date | Dayjs): boolean;
    static isAfter(date1: string | Date | Dayjs, date2: string | Date | Dayjs): boolean;
    static startOfDay(date: string | Date | Dayjs): Dayjs;
    static endOfDay(date: string | Date | Dayjs): Dayjs;
    static diff(date1: string | Date | Dayjs, date2: string | Date | Dayjs, unit?: QUnitType | OpUnitType): number;
}
