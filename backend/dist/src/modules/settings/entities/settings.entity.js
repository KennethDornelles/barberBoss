"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
class Settings {
    id;
    businessName;
    openTime;
    closeTime;
    workingDays;
    slotIntervalMin;
    maxAdvanceDays;
    minAdvanceHours;
    enableReminders;
    reminderHoursBefore;
    createdAt;
    updatedAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.Settings = Settings;
//# sourceMappingURL=settings.entity.js.map