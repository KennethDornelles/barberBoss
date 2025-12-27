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
exports.CreateSettingsDto = void 0;
const class_validator_1 = require("class-validator");
class CreateSettingsDto {
    businessName;
    openTime;
    closeTime;
    workingDays;
    slotIntervalMin;
    maxAdvanceDays;
    minAdvanceHours;
    enableReminders;
    reminderHoursBefore;
}
exports.CreateSettingsDto = CreateSettingsDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'businessName deve ser uma string' }),
    (0, class_validator_1.MinLength)(2, { message: 'businessName deve ter no mínimo 2 caracteres' }),
    (0, class_validator_1.MaxLength)(100, { message: 'businessName deve ter no máximo 100 caracteres' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSettingsDto.prototype, "businessName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'openTime deve ser uma string' }),
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'openTime deve estar no formato HH:mm (ex: 08:00)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSettingsDto.prototype, "openTime", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'closeTime deve ser uma string' }),
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'closeTime deve estar no formato HH:mm (ex: 18:00)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSettingsDto.prototype, "closeTime", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'workingDays deve ser um array' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'workingDays deve ter pelo menos 1 dia' }),
    (0, class_validator_1.ArrayMaxSize)(7, { message: 'workingDays não pode ter mais de 7 dias' }),
    (0, class_validator_1.IsInt)({
        each: true,
        message: 'Cada dia em workingDays deve ser um número inteiro',
    }),
    (0, class_validator_1.Min)(0, {
        each: true,
        message: 'Dias devem estar entre 0 (Domingo) e 6 (Sábado)',
    }),
    (0, class_validator_1.Max)(6, {
        each: true,
        message: 'Dias devem estar entre 0 (Domingo) e 6 (Sábado)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateSettingsDto.prototype, "workingDays", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'slotIntervalMin deve ser um número inteiro' }),
    (0, class_validator_1.Min)(5, { message: 'slotIntervalMin deve ser no mínimo 5 minutos' }),
    (0, class_validator_1.Max)(120, { message: 'slotIntervalMin deve ser no máximo 120 minutos' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSettingsDto.prototype, "slotIntervalMin", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'maxAdvanceDays deve ser um número inteiro' }),
    (0, class_validator_1.Min)(1, { message: 'maxAdvanceDays deve ser no mínimo 1 dia' }),
    (0, class_validator_1.Max)(365, { message: 'maxAdvanceDays deve ser no máximo 365 dias' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSettingsDto.prototype, "maxAdvanceDays", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'minAdvanceHours deve ser um número inteiro' }),
    (0, class_validator_1.Min)(0, { message: 'minAdvanceHours deve ser no mínimo 0 horas' }),
    (0, class_validator_1.Max)(72, { message: 'minAdvanceHours deve ser no máximo 72 horas' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSettingsDto.prototype, "minAdvanceHours", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'enableReminders deve ser um booleano' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateSettingsDto.prototype, "enableReminders", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'reminderHoursBefore deve ser um número inteiro' }),
    (0, class_validator_1.Min)(1, { message: 'reminderHoursBefore deve ser no mínimo 1 hora' }),
    (0, class_validator_1.Max)(168, {
        message: 'reminderHoursBefore deve ser no máximo 168 horas (7 dias)',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSettingsDto.prototype, "reminderHoursBefore", void 0);
//# sourceMappingURL=create-settings.dto.js.map