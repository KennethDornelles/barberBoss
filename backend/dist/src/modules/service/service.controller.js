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
exports.ServiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_service_1 = require("./service.service");
const create_service_dto_1 = require("./dto/create-service.dto");
const update_service_dto_1 = require("./dto/update-service.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const client_1 = require("@prisma/client");
const public_decorator_1 = require("../../decorators/public.decorator");
const throttle_decorator_1 = require("../../decorators/throttle.decorator");
let ServiceController = class ServiceController {
    serviceService;
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    create(createServiceDto) {
        return this.serviceService.create(createServiceDto);
    }
    findAll(paginationDto) {
        return this.serviceService.findAll(paginationDto);
    }
    findOne(id) {
        return this.serviceService.findOne(id);
    }
    update(id, updateServiceDto) {
        return this.serviceService.update(id, updateServiceDto);
    }
    remove(id) {
        return this.serviceService.remove(id);
    }
};
exports.ServiceController = ServiceController;
__decorate([
    (0, common_1.Post)(),
    (0, throttle_decorator_1.ThrottleModerate)(),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Criar novo serviço (apenas ADMIN)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Serviço criado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autorizado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado - apenas ADMIN' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_dto_1.CreateServiceDto]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, throttle_decorator_1.ThrottleRelaxed)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os serviços com paginação (público)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de serviços retornada com sucesso',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar serviço por ID (público)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do serviço' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Serviço encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Serviço não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar serviço (apenas ADMIN)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do serviço' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Serviço atualizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Serviço não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autorizado' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado - apenas ADMIN' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_service_dto_1.UpdateServiceDto]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Remover serviço (apenas ADMIN)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'UUID do serviço' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Serviço removido com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Serviço não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "remove", null);
exports.ServiceController = ServiceController = __decorate([
    (0, swagger_1.ApiTags)('services'),
    (0, common_1.Controller)('services'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], ServiceController);
//# sourceMappingURL=service.controller.js.map