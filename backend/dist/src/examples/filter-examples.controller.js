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
exports.FilterExamplesController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FilterExamplesController = class FilterExamplesController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async notFoundExample(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_2.NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return user;
    }
    badRequestExample(data) {
        if (!data.email) {
            throw new common_2.BadRequestException('Email é obrigatório');
        }
        if (!data.email.includes('@')) {
            throw new common_2.BadRequestException('Email inválido');
        }
        return { message: 'Email válido' };
    }
    async duplicateEmailExample(data) {
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: 'hashedPassword',
                role: 'CLIENT',
            },
        });
        return user;
    }
    async deleteNonexistentExample(id) {
        const user = await this.prisma.user.delete({
            where: { id },
        });
        return user;
    }
    unexpectedErrorExample() {
        const obj = null;
        return obj?.property;
    }
    async invalidForeignKeyExample(data) {
        const appointment = await this.prisma.appointment.create({
            data: {
                userId: data.userId,
                serviceId: 'uuid-qualquer',
                startsAt: new Date(),
                endsAt: new Date(Date.now() + 60 * 60 * 1000),
                status: 'CONFIRMED',
            },
        });
        return appointment;
    }
    unauthorizedExample() {
        throw new common_2.UnauthorizedException('Token inválido ou expirado');
    }
    forbiddenExample() {
        throw new common_2.ForbiddenException('Você não tem permissão para acessar este recurso');
    }
    validationExample(data) {
        return { message: 'Dados válidos', data };
    }
};
exports.FilterExamplesController = FilterExamplesController;
__decorate([
    (0, common_1.Get)('not-found/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilterExamplesController.prototype, "notFoundExample", null);
__decorate([
    (0, common_1.Post)('bad-request'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FilterExamplesController.prototype, "badRequestExample", null);
__decorate([
    (0, common_1.Post)('duplicate-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilterExamplesController.prototype, "duplicateEmailExample", null);
__decorate([
    (0, common_1.Get)('delete-nonexistent/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilterExamplesController.prototype, "deleteNonexistentExample", null);
__decorate([
    (0, common_1.Get)('unexpected-error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FilterExamplesController.prototype, "unexpectedErrorExample", null);
__decorate([
    (0, common_1.Post)('invalid-foreign-key'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilterExamplesController.prototype, "invalidForeignKeyExample", null);
__decorate([
    (0, common_1.Get)('unauthorized'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FilterExamplesController.prototype, "unauthorizedExample", null);
__decorate([
    (0, common_1.Get)('forbidden'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FilterExamplesController.prototype, "forbiddenExample", null);
__decorate([
    (0, common_1.Post)('validation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto]),
    __metadata("design:returntype", void 0)
], FilterExamplesController.prototype, "validationExample", null);
exports.FilterExamplesController = FilterExamplesController = __decorate([
    (0, common_1.Controller)('examples/filters'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FilterExamplesController);
const class_validator_1 = require("class-validator");
const common_2 = require("@nestjs/common");
class CreateUserDto {
    email;
    name;
    password;
    role;
}
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email inválido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email é obrigatório' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome é obrigatório' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['ADMIN', 'BARBER', 'CLIENT'], {
        message: 'Role deve ser ADMIN, BARBER ou CLIENT',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
//# sourceMappingURL=filter-examples.controller.js.map