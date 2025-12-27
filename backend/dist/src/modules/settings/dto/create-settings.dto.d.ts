export declare class CreateSettingsDto {
    businessName?: string;
    openTime?: string;
    closeTime?: string;
    workingDays?: number[];
    slotIntervalMin?: number;
    maxAdvanceDays?: number;
    minAdvanceHours?: number;
    enableReminders?: boolean;
    reminderHoursBefore?: number;
}
