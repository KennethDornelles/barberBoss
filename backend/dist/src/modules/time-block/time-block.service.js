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
exports.TimeBlockService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const time_block_entity_1 = require("./entities/time-block.entity");
let TimeBlockService = class TimeBlockService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTimeBlockDto) {
        const startsAt = new Date(createTimeBlockDto.startsAt);
        const endsAt = new Date(createTimeBlockDto.endsAt);
        if (startsAt >= endsAt) {
            throw new common_1.BadRequestException('A data de início deve ser anterior à data de término');
        }
        if (createTimeBlockDto.isRecurring &&
            (!createTimeBlockDto.recurringDays ||
                createTimeBlockDto.recurringDays.length === 0)) {
            throw new common_1.BadRequestException('recurringDays é obrigatório quando isRecurring é true');
        }
        const timeBlock = await this.prisma.timeBlock.create({
            data: {
                type: createTimeBlockDto.type ?? 'CUSTOM',
                reason: createTimeBlockDto.reason,
                startsAt,
                endsAt,
                isRecurring: createTimeBlockDto.isRecurring ?? false,
                recurringDays: createTimeBlockDto.recurringDays ?? [],
            },
        });
        return new time_block_entity_1.TimeBlock(timeBlock);
    }
    async findAll() {
        const timeBlocks = await this.prisma.timeBlock.findMany({
            where: { active: true },
            orderBy: { startsAt: 'asc' },
        });
        return timeBlocks.map((block) => new time_block_entity_1.TimeBlock(block));
    }
    async findOne(id) {
        const timeBlock = await this.prisma.timeBlock.findUnique({
            where: { id },
        });
        if (!timeBlock || !timeBlock.active) {
            throw new common_1.NotFoundException('Bloqueio de horário não encontrado');
        }
        return new time_block_entity_1.TimeBlock(timeBlock);
    }
    async findByDateRange(start, end) {
        const where = {
            active: true,
            OR: [
                {
                    startsAt: {
                        gte: start,
                        lt: end,
                    },
                },
                {
                    endsAt: {
                        gt: start,
                        lte: end,
                    },
                },
                {
                    AND: [
                        {
                            startsAt: {
                                lte: start,
                            },
                        },
                        {
                            endsAt: {
                                gte: end,
                            },
                        },
                    ],
                },
            ],
        };
        const timeBlocks = await this.prisma.timeBlock.findMany({
            where,
            orderBy: { startsAt: 'asc' },
        });
        return timeBlocks.map((block) => new time_block_entity_1.TimeBlock(block));
    }
    async isBlocked(startsAt, endsAt) {
        const dayOfWeek = startsAt.getDay();
        const where = {
            active: true,
            OR: [
                {
                    AND: [
                        { isRecurring: false },
                        {
                            OR: [
                                {
                                    AND: [
                                        { startsAt: { lte: startsAt } },
                                        { endsAt: { gt: startsAt } },
                                    ],
                                },
                                {
                                    AND: [
                                        { startsAt: { lt: endsAt } },
                                        { endsAt: { gte: endsAt } },
                                    ],
                                },
                                {
                                    AND: [
                                        { startsAt: { gte: startsAt } },
                                        { endsAt: { lte: endsAt } },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    AND: [{ isRecurring: true }, { recurringDays: { has: dayOfWeek } }],
                },
            ],
        };
        const blocks = await this.prisma.timeBlock.findMany({ where });
        for (const block of blocks) {
            if (block.isRecurring &&
                Array.isArray(block.recurringDays) &&
                block.recurringDays.includes(dayOfWeek)) {
                const blockStart = new Date(block.startsAt);
                const blockEnd = new Date(block.endsAt);
                const blockStartTime = blockStart.getHours() * 60 + blockStart.getMinutes();
                const blockEndTime = blockEnd.getHours() * 60 + blockEnd.getMinutes();
                const startsAtTime = startsAt.getHours() * 60 + startsAt.getMinutes();
                const endsAtTime = endsAt.getHours() * 60 + endsAt.getMinutes();
                if ((startsAtTime >= blockStartTime && startsAtTime < blockEndTime) ||
                    (endsAtTime > blockStartTime && endsAtTime <= blockEndTime) ||
                    (startsAtTime <= blockStartTime && endsAtTime >= blockEndTime)) {
                    return true;
                }
            }
            else {
                return true;
            }
        }
        return false;
    }
    async getBlockInfo(startsAt, endsAt) {
        const dayOfWeek = startsAt.getDay();
        const where = {
            active: true,
            OR: [
                {
                    AND: [
                        { isRecurring: false },
                        {
                            OR: [
                                {
                                    AND: [
                                        { startsAt: { lte: startsAt } },
                                        { endsAt: { gt: startsAt } },
                                    ],
                                },
                                {
                                    AND: [
                                        { startsAt: { lt: endsAt } },
                                        { endsAt: { gte: endsAt } },
                                    ],
                                },
                                {
                                    AND: [
                                        { startsAt: { gte: startsAt } },
                                        { endsAt: { lte: endsAt } },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    AND: [{ isRecurring: true }, { recurringDays: { has: dayOfWeek } }],
                },
            ],
        };
        const blocks = await this.prisma.timeBlock.findMany({
            where,
            orderBy: { createdAt: 'asc' },
        });
        for (const block of blocks) {
            if (block.isRecurring &&
                Array.isArray(block.recurringDays) &&
                block.recurringDays.includes(dayOfWeek)) {
                const blockStart = new Date(block.startsAt);
                const blockEnd = new Date(block.endsAt);
                const blockStartTime = blockStart.getHours() * 60 + blockStart.getMinutes();
                const blockEndTime = blockEnd.getHours() * 60 + blockEnd.getMinutes();
                const startsAtTime = startsAt.getHours() * 60 + startsAt.getMinutes();
                const endsAtTime = endsAt.getHours() * 60 + endsAt.getMinutes();
                if ((startsAtTime >= blockStartTime && startsAtTime < blockEndTime) ||
                    (endsAtTime > blockStartTime && endsAtTime <= blockEndTime) ||
                    (startsAtTime <= blockStartTime && endsAtTime >= blockEndTime)) {
                    return new time_block_entity_1.TimeBlock(block);
                }
            }
            else if (blocks.length > 0) {
                return new time_block_entity_1.TimeBlock(block);
            }
        }
        return null;
    }
    async update(id, updateTimeBlockDto) {
        await this.findOne(id);
        if (updateTimeBlockDto.startsAt || updateTimeBlockDto.endsAt) {
            const current = await this.prisma.timeBlock.findUnique({
                where: { id },
            });
            if (!current) {
                throw new common_1.NotFoundException('Bloqueio de horário não encontrado');
            }
            const startsAt = updateTimeBlockDto.startsAt
                ? new Date(updateTimeBlockDto.startsAt)
                : current.startsAt;
            const endsAt = updateTimeBlockDto.endsAt
                ? new Date(updateTimeBlockDto.endsAt)
                : current.endsAt;
            if (startsAt >= endsAt) {
                throw new common_1.BadRequestException('A data de início deve ser anterior à data de término');
            }
        }
        const updateData = {};
        if (updateTimeBlockDto.type) {
            updateData.type = updateTimeBlockDto.type;
        }
        if (updateTimeBlockDto.reason !== undefined) {
            updateData.reason = updateTimeBlockDto.reason;
        }
        if (updateTimeBlockDto.startsAt) {
            updateData.startsAt = new Date(updateTimeBlockDto.startsAt);
        }
        if (updateTimeBlockDto.endsAt) {
            updateData.endsAt = new Date(updateTimeBlockDto.endsAt);
        }
        if (updateTimeBlockDto.isRecurring !== undefined) {
            updateData.isRecurring = updateTimeBlockDto.isRecurring;
        }
        if (updateTimeBlockDto.recurringDays) {
            updateData.recurringDays = updateTimeBlockDto.recurringDays;
        }
        if (updateTimeBlockDto.active !== undefined) {
            updateData.active = updateTimeBlockDto.active;
        }
        const timeBlock = await this.prisma.timeBlock.update({
            where: { id },
            data: updateData,
        });
        return new time_block_entity_1.TimeBlock(timeBlock);
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.timeBlock.update({
            where: { id },
            data: { active: false },
        });
    }
};
exports.TimeBlockService = TimeBlockService;
exports.TimeBlockService = TimeBlockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimeBlockService);
//# sourceMappingURL=time-block.service.js.map