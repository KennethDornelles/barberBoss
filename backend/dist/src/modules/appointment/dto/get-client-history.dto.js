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
exports.GetClientHistoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
class GetClientHistoryDto extends pagination_dto_1.PaginationDto {
    clientName;
    phone;
}
exports.GetClientHistoryDto = GetClientHistoryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Nome do cliente para buscar histórico (busca parcial, case-insensitive)',
        example: 'João Silva',
        minLength: 2,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
    __metadata("design:type", String)
], GetClientHistoryDto.prototype, "clientName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Telefone do cliente para buscar histórico',
        example: '11987654321',
        minLength: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10, { message: 'O telefone deve ter pelo menos 10 dígitos' }),
    __metadata("design:type", String)
], GetClientHistoryDto.prototype, "phone", void 0);
//# sourceMappingURL=get-client-history.dto.js.map