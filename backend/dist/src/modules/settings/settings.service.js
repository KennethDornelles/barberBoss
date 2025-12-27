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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const settings_entity_1 = require("./entities/settings.entity");
let SettingsService = class SettingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async get() {
        let settings = await this.prisma.settings.findFirst();
        if (!settings) {
            settings = await this.prisma.settings.create({
                data: {
                    businessName: 'Barber Boss',
                    openTime: '08:00',
                    closeTime: '18:00',
                    workingDays: [1, 2, 3, 4, 5, 6],
                    slotIntervalMin: 15,
                    maxAdvanceDays: 30,
                    minAdvanceHours: 2,
                    enableReminders: false,
                    reminderHoursBefore: 24,
                },
            });
        }
        return new settings_entity_1.Settings(settings);
    }
    async update(updateSettingsDto) {
        const current = await this.get();
        if (updateSettingsDto.openTime || updateSettingsDto.closeTime) {
            const openTime = updateSettingsDto.openTime || current.openTime;
            const closeTime = updateSettingsDto.closeTime || current.closeTime;
            if (this.timeToMinutes(openTime) >= this.timeToMinutes(closeTime)) {
                throw new common_1.BadRequestException('O horário de abertura deve ser anterior ao horário de fechamento');
            }
        }
        if (updateSettingsDto.workingDays) {
            const uniqueDays = [...new Set(updateSettingsDto.workingDays)];
            if (uniqueDays.length !== updateSettingsDto.workingDays.length) {
                throw new common_1.BadRequestException('workingDays não pode ter dias duplicados');
            }
        }
        const updated = await this.prisma.settings.update({
            where: { id: current.id },
            data: updateSettingsDto,
        });
        return new settings_entity_1.Settings(updated);
    }
    isWithinBusinessHours(date) {
        const settings = this.getCachedSettings();
        if (!settings)
            return true;
        const day = date.getDay();
        const timeInMinutes = date.getHours() * 60 + date.getMinutes();
        if (!settings.workingDays.includes(day)) {
            return false;
        }
        const openMinutes = this.timeToMinutes(settings.openTime);
        const closeMinutes = this.timeToMinutes(settings.closeTime);
        return timeInMinutes >= openMinutes && timeInMinutes < closeMinutes;
    }
    getDayName(dayNumber) {
        const days = [
            'Domingo',
            'Segunda-feira',
            'Terça-feira',
            'Quarta-feira',
            'Quinta-feira',
            'Sexta-feira',
            'Sábado',
        ];
        return days[dayNumber] || 'Dia inválido';
    }
    timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }
    cachedSettings = null;
    lastCacheTime = 0;
    CACHE_DURATION_MS = 60000;
    getCachedSettings() {
        const now = Date.now();
        if (now - this.lastCacheTime > this.CACHE_DURATION_MS) {
            this.cachedSettings = null;
        }
        return this.cachedSettings;
    }
    async refreshCache() {
        this.cachedSettings = await this.get();
        this.lastCacheTime = Date.now();
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SettingsService);
//# sourceMappingURL=settings.service.js.map