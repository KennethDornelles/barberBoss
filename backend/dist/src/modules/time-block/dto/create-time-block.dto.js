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
exports.CreateTimeBlockDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateTimeBlockDto {
    type;
    reason;
    startsAt;
    endsAt;
    isRecurring;
    recurringDays;
}
exports.CreateTimeBlockDto = CreateTimeBlockDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: client_1.BlockType,
        description: 'Tipo do bloqueio',
        example: 'LUNCH',
    }),
    (0, class_validator_1.IsEnum)(client_1.BlockType, {
        message: 'type deve ser um valor válido: LUNCH, BREAK, DAY_OFF, VACATION, CUSTOM',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTimeBlockDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Motivo do bloqueio',
        example: 'Horário de almoço',
        minLength: 2,
        maxLength: 200,
    }),
    (0, class_validator_1.IsString)({ message: 'reason deve ser uma string' }),
    (0, class_validator_1.MinLength)(2, { message: 'reason deve ter no mínimo 2 caracteres' }),
    (0, class_validator_1.MaxLength)(200, { message: 'reason deve ter no máximo 200 caracteres' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTimeBlockDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data e hora de início do bloqueio',
        example: '2025-01-10T12:00:00.000Z',
    }),
    (0, class_validator_1.IsDateString)({}, { message: 'startsAt deve ser uma data válida no formato ISO 8601' }),
    __metadata("design:type", String)
], CreateTimeBlockDto.prototype, "startsAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Data e hora de término do bloqueio',
        example: '2025-01-10T13:00:00.000Z',
    }),
    (0, class_validator_1.IsDateString)({}, { message: 'endsAt deve ser uma data válida no formato ISO 8601' }),
    __metadata("design:type", String)
], CreateTimeBlockDto.prototype, "endsAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Se o bloqueio é recorrente (repete em dias específicos)',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)({ message: 'isRecurring deve ser um booleano' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTimeBlockDto.prototype, "isRecurring", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Dias da semana para bloqueios recorrentes (0=Domingo, 6=Sábado)',
        example: [1, 2, 3, 4, 5],
        type: [Number],
    }),
    (0, class_validator_1.IsArray)({ message: 'recurringDays deve ser um array' }),
    (0, class_validator_1.IsInt)({ each: true, message: 'Cada dia deve ser um número inteiro' }),
    (0, class_validator_1.Min)(0, { each: true, message: 'Dias devem estar entre 0 e 6' }),
    (0, class_validator_1.Max)(6, { each: true, message: 'Dias devem estar entre 0 e 6' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateTimeBlockDto.prototype, "recurringDays", void 0);
//# sourceMappingURL=create-time-block.dto.js.map