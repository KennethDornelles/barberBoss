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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeBlockController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const time_block_service_1 = require("./time-block.service");
const create_time_block_dto_1 = require("./dto/create-time-block.dto");
const update_time_block_dto_1 = require("./dto/update-time-block.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const public_decorator_1 = require("../../decorators/public.decorator");
const client_1 = require("@prisma/client");
let TimeBlockController = class TimeBlockController {
    timeBlockService;
    constructor(timeBlockService) {
        this.timeBlockService = timeBlockService;
    }
    create(createTimeBlockDto) {
        return this.timeBlockService.create(createTimeBlockDto);
    }
    findAll() {
        return this.timeBlockService.findAll();
    }
    findByDateRange(startDate, endDate) {
        return this.timeBlockService.findByDateRange(new Date(startDate), new Date(endDate));
    }
    findOne(id) {
        return this.timeBlockService.findOne(id);
    }
    update(id, updateTimeBlockDto) {
        return this.timeBlockService.update(id, updateTimeBlockDto);
    }
    remove(id) {
        return this.timeBlockService.remove(id);
    }
};
exports.TimeBlockController = TimeBlockController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Criar bloqueio de horário' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Bloqueio criado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sem permissão (apenas ADMIN)' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_time_block_dto_1.CreateTimeBlockDto]),
    __metadata("design:returntype", void 0)
], TimeBlockController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os bloqueios ativos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de bloqueios retornada' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TimeBlockController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('range'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar bloqueios por período' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', example: '2025-01-10T08:00:00.000Z' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', example: '2025-01-10T18:00:00.000Z' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bloqueios no período retornados' }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TimeBlockController.prototype, "findByDateRange", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar bloqueio por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bloqueio encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bloqueio não encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TimeBlockController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar bloqueio de horário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bloqueio atualizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sem permissão (apenas ADMIN)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bloqueio não encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_time_block_dto_1.UpdateTimeBlockDto]),
    __metadata("design:returntype", void 0)
], TimeBlockController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover bloqueio de horário (soft delete)' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Bloqueio removido com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Sem permissão (apenas ADMIN)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bloqueio não encontrado' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TimeBlockController.prototype, "remove", null);
exports.TimeBlockController = TimeBlockController = __decorate([
    (0, swagger_1.ApiTags)('time-blocks'),
    (0, common_1.Controller)('time-blocks'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [time_block_service_1.TimeBlockService])
], TimeBlockController);
//# sourceMappingURL=time-block.controller.js.map