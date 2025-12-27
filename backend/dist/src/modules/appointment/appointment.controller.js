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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const appointment_service_1 = require("./appointment.service");
const create_appointment_dto_1 = require("./dto/create-appointment.dto");
const update_appointment_dto_1 = require("./dto/update-appointment.dto");
const get_available_slots_dto_1 = require("./dto/get-available-slots.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const appointment_filter_dto_1 = require("./dto/appointment-filter.dto");
const public_decorator_1 = require("../../decorators/public.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const current_user_decorator_1 = require("../../decorators/current-user.decorator");
const client_1 = require("@prisma/client");
const dayjs_config_1 = __importDefault(require("../../config/dayjs.config"));
const throttle_decorator_1 = require("../../decorators/throttle.decorator");
let AppointmentController = class AppointmentController {
    appointmentService;
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    create(createAppointmentDto, user) {
        console.log('--- [DEBUG] AppointmentController.create ---');
        console.log('DTO recebido:', JSON.stringify(createAppointmentDto, null, 2));
        if (user?.id && !createAppointmentDto.userId) {
            createAppointmentDto.userId = user.id;
        }
        const timezone = createAppointmentDto.timezone || 'America/Sao_Paulo';
        return this.appointmentService.create({
            ...createAppointmentDto,
            timezone,
        });
    }
    findAll(filter, user) {
        const { date, barberId, page, offset, limit } = filter;
        const paginationDto = { limit: limit || 10 };
        if (page) {
            paginationDto.page = page;
        }
        else if (offset !== undefined) {
            paginationDto.page = Math.floor((offset || 0) / (limit || 10)) + 1;
        }
        else {
            paginationDto.page = 1;
        }
        if (date) {
            return this.appointmentService.findByDate((0, dayjs_config_1.default)(date).toDate(), paginationDto);
        }
        if (user.role === client_1.Role.BARBER || user.role === client_1.Role.ADMIN) {
            const targetBarberId = barberId || user.id;
            return this.appointmentService.findByBarber(targetBarberId, paginationDto);
        }
        return this.appointmentService.findByUser(user.id, paginationDto);
    }
    findOne(id) {
        return this.appointmentService.findOne(id);
    }
    update(id, updateAppointmentDto, user) {
        if (user?.role === 'CLIENT') {
            return this.appointmentService.findOne(id).then((appointment) => {
                if (appointment.userId !== user.id) {
                    throw new Error('Você só pode cancelar/agendar seus próprios agendamentos.');
                }
                return this.appointmentService.update(id, updateAppointmentDto);
            });
        }
        return this.appointmentService.update(id, updateAppointmentDto);
    }
    remove(id) {
        return this.appointmentService.remove(id);
    }
    async getAvailableSlots(query) {
        return this.appointmentService.getAvailableSlots(query.date, query.serviceId);
    }
    async getClientHistory(clientName, phone, paginationDto) {
        return this.appointmentService.getClientHistory(clientName, phone, paginationDto);
    }
};
exports.AppointmentController = AppointmentController;
__decorate([
    (0, common_1.Post)(),
    (0, throttle_decorator_1.ThrottleModerate)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Criar novo agendamento (requer autenticação)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Agendamento criado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autorizado' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_dto_1.CreateAppointmentDto, Object]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, throttle_decorator_1.ThrottleRelaxed)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar agendamentos com filtros opcionais e paginação (requer autenticação)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de agendamentos retornada com sucesso',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_filter_dto_1.AppointmentFilterDto, Object]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar agendamento por ID (requer autenticação)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do agendamento' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Agendamento encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Agendamento não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autorizado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.BARBER, client_1.Role.CLIENT),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar agendamento (ADMIN ou BARBER)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do agendamento' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Agendamento atualizado com sucesso',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Agendamento não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autorizado' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Acesso negado - apenas ADMIN ou BARBER',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appointment_dto_1.UpdateAppointmentDto, Object]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Remover agendamento (apenas ADMIN)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do agendamento' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Agendamento removido com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Agendamento não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autorizado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado - apenas ADMIN' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('available-slots/search'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Buscar horários disponíveis para agendamento',
        description: 'Retorna lista de horários disponíveis para um serviço em uma data específica',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de horários disponíveis',
        schema: {
            type: 'object',
            properties: {
                slots: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Lista de horários disponíveis em formato ISO 8601',
                },
                businessHours: {
                    type: 'object',
                    properties: {
                        openTime: { type: 'string', example: '08:00' },
                        closeTime: { type: 'string', example: '18:00' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Data ou serviço inválido' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Serviço não encontrado' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_available_slots_dto_1.GetAvailableSlotsDto]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getAvailableSlots", null);
__decorate([
    (0, common_1.Get)('client-history'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.BARBER),
    (0, swagger_1.ApiOperation)({
        summary: 'Buscar histórico de agendamentos de um cliente por nome ou telefone',
        description: 'Retorna o histórico paginado...',
    }),
    (0, swagger_1.ApiQuery)({ name: 'clientName', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'phone', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false }),
    __param(0, (0, common_1.Query)('clientName')),
    __param(1, (0, common_1.Query)('phone')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getClientHistory", null);
exports.AppointmentController = AppointmentController = __decorate([
    (0, swagger_1.ApiTags)('appointments'),
    (0, common_1.Controller)('appointments'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService])
], AppointmentController);
//# sourceMappingURL=appointment.controller.js.map