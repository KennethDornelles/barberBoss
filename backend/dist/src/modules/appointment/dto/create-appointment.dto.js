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
exports.CreateAppointmentDto = exports.IsUserIdXorClientNameConstraint = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
let IsUserIdXorClientNameConstraint = class IsUserIdXorClientNameConstraint {
    validate(value, args) {
        const object = args.object;
        const hasUserId = !!object.userId;
        const hasClientName = !!object.clientName;
        return hasUserId !== hasClientName;
    }
    defaultMessage(args) {
        const object = args.object;
        const hasUserId = !!object.userId;
        const hasClientName = !!object.clientName;
        if (hasUserId && hasClientName) {
            return 'Forneça APENAS userId (cliente cadastrado) OU clientName (agendamento manual), não ambos.';
        }
        return 'É necessário fornecer userId (cliente cadastrado) ou clientName (agendamento manual).';
    }
};
exports.IsUserIdXorClientNameConstraint = IsUserIdXorClientNameConstraint;
exports.IsUserIdXorClientNameConstraint = IsUserIdXorClientNameConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsUserIdXorClientName', async: false })
], IsUserIdXorClientNameConstraint);
class CreateAppointmentDto {
    userId;
    clientName;
    barberId;
    serviceId;
    startsAt;
    endsAt;
    status;
    timezone;
}
exports.CreateAppointmentDto = CreateAppointmentDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'userId deve ser um UUID válido (formato v4)' }),
    (0, class_validator_1.Validate)(IsUserIdXorClientNameConstraint),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'clientName deve ser uma string' }),
    (0, class_validator_1.MinLength)(2, {
        message: 'Nome do cliente deve ter pelo menos 2 caracteres',
    }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "clientName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'barberId é obrigatório' }),
    (0, class_validator_1.IsUUID)('4', { message: 'barberId deve ser um UUID válido (formato v4)' }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "barberId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'serviceId é obrigatório' }),
    (0, class_validator_1.IsUUID)('4', { message: 'serviceId deve ser um UUID válido (formato v4)' }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "serviceId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'startsAt é obrigatório' }),
    (0, class_validator_1.IsISO8601)({ strict: true }, {
        message: 'startsAt deve estar no formato ISO 8601 (ex: "2025-12-10T10:00:00.000Z")',
    }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "startsAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)({ strict: true }, {
        message: 'endsAt deve estar no formato ISO 8601 (ex: "2025-12-10T11:00:00.000Z")',
    }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "endsAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED', 'NO_SHOW'], {
        message: 'status deve ser: PENDING, CONFIRMED, CANCELED, COMPLETED ou NO_SHOW',
    }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "timezone", void 0);
//# sourceMappingURL=create-appointment.dto.js.map