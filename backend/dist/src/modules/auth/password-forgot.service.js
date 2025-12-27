"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordForgotService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const brevo_service_1 = require("./brevo.service");
let PasswordForgotService = class PasswordForgotService {
    prisma;
    jwtService;
    brevoService;
    constructor(prisma, jwtService, brevoService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.brevoService = brevoService;
    }
    async requestPasswordReset(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const token = this.jwtService.sign({ userId: user.id }, { expiresIn: '1h' });
        const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:4200'}/reset-password?token=${token}`;
        console.log('[PasswordForgotService] Token de recuperação:', token);
        console.log('[PasswordForgotService] Link de redefinição:', resetLink);
        await this.brevoService.sendPasswordResetEmail(user.email, resetLink);
        return {
            message: 'Se o e-mail existir, um link de redefinição foi enviado.',
            token,
        };
    }
    async resetPassword(dto) {
        let payload;
        try {
            payload = this.jwtService.verify(dto.token);
        }
        catch {
            throw new common_1.BadRequestException('Token inválido ou expirado');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: payload.userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const hashed = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { password: hashed },
        });
        return { message: 'Senha redefinida com sucesso' };
    }
};
exports.PasswordForgotService = PasswordForgotService;
exports.PasswordForgotService = PasswordForgotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        brevo_service_1.BrevoService])
], PasswordForgotService);
//# sourceMappingURL=password-forgot.service.js.map