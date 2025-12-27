"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeBlock = void 0;
class TimeBlock {
    id;
    type;
    reason;
    startsAt;
    endsAt;
    isRecurring;
    recurringDays;
    active;
    createdAt;
    updatedAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.TimeBlock = TimeBlock;
//# sourceMappingURL=time-block.entity.js.map