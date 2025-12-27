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
exports.PasswordForgotController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const password_forgot_service_1 = require("./password-forgot.service");
const password_forgot_dto_1 = require("./dto/password-forgot.dto");
const password_reset_dto_1 = require("./dto/password-reset.dto");
const public_decorator_1 = require("../../decorators/public.decorator");
let PasswordForgotController = class PasswordForgotController {
    passwordForgotService;
    constructor(passwordForgotService) {
        this.passwordForgotService = passwordForgotService;
    }
    async forgot(dto) {
        return this.passwordForgotService.requestPasswordReset(dto);
    }
    async reset(dto) {
        return this.passwordForgotService.resetPassword(dto);
    }
};
exports.PasswordForgotController = PasswordForgotController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('forgot'),
    (0, swagger_1.ApiOperation)({ summary: 'Solicitar recuperação de senha' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Se o e-mail existir, um link de redefinição foi enviado.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_forgot_dto_1.PasswordForgotDto]),
    __metadata("design:returntype", Promise)
], PasswordForgotController.prototype, "forgot", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('reset'),
    (0, swagger_1.ApiOperation)({ summary: 'Redefinir senha com token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Senha redefinida com sucesso' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_reset_dto_1.PasswordResetDto]),
    __metadata("design:returntype", Promise)
], PasswordForgotController.prototype, "reset", null);
exports.PasswordForgotController = PasswordForgotController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth/password'),
    __metadata("design:paramtypes", [password_forgot_service_1.PasswordForgotService])
], PasswordForgotController);
//# sourceMappingURL=password-forgot.controller.js.map