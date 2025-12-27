"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppointmentDto = exports.IsUserIdXorClientNameForUpdateConstraint = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
let IsUserIdXorClientNameForUpdateConstraint = class IsUserIdXorClientNameForUpdateConstraint {
    validate(value, args) {
        const object = args.object;
        if (object.userId === undefined && object.clientName === undefined) {
            return true;
        }
        if ((object.userId !== undefined && object.clientName === undefined) ||
            (object.userId === undefined && object.clientName !== undefined)) {
            return true;
        }
        const hasUserId = object.userId !== undefined && object.userId !== null;
        const hasClientName = object.clientName !== undefined && object.clientName !== null;
        if (hasUserId && hasClientName) {
            return false;
        }
        return true;
    }
    defaultMessage() {
        return 'No update, forneça APENAS userId (cliente cadastrado) OU clientName (agendamento manual), não ambos simultaneamente. Use null para remover um campo.';
    }
};
exports.IsUserIdXorClientNameForUpdateConstraint = IsUserIdXorClientNameForUpdateConstraint;
exports.IsUserIdXorClientNameForUpdateConstraint = IsUserIdXorClientNameForUpdateConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsUserIdXorClientNameForUpdate', async: false })
], IsUserIdXorClientNameForUpdateConstraint);
class UpdateAppointmentDto {
    userId;
    clientName;
    serviceId;
    startsAt;
    endsAt;
    status;
    timezone;
}
exports.UpdateAppointmentDto = UpdateAppointmentDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'userId deve ser um UUID válido (formato v4)' }),
    (0, class_validator_1.Validate)(IsUserIdXorClientNameForUpdateConstraint),
    __metadata("design:type", Object)
], UpdateAppointmentDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'clientName deve ser uma string' }),
    (0, class_validator_1.MinLength)(2, {
        message: 'Nome do cliente deve ter pelo menos 2 caracteres',
    }),
    __metadata("design:type", Object)
], UpdateAppointmentDto.prototype, "clientName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'serviceId deve ser um UUID válido (formato v4)' }),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "serviceId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)({ strict: true }, {
        message: 'startsAt deve estar no formato ISO 8601 (ex: "2025-12-10T10:00:00.000Z")',
    }),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "startsAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)({ strict: true }, {
        message: 'endsAt deve estar no formato ISO 8601 (ex: "2025-12-10T11:00:00.000Z")',
    }),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "endsAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED', 'NO_SHOW'], {
        message: 'status deve ser: PENDING, CONFIRMED, CANCELED, COMPLETED ou NO_SHOW',
    }),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "timezone", void 0);
//# sourceMappingURL=update-appointment.dto.js.map