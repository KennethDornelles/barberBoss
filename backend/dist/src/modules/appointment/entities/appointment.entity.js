"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
class Appointment {
    id;
    startsAt;
    endsAt;
    status;
    userId;
    clientName;
    barberId;
    serviceId;
    createdAt;
    updatedAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.Appointment = Appointment;
//# sourceMappingURL=appointment.entity.js.map