import { BlockType } from '@prisma/client';
export declare class CreateTimeBlockDto {
    type?: BlockType;
    reason?: string;
    startsAt: string;
    endsAt: string;
    isRecurring?: boolean;
    recurringDays?: number[];
}
