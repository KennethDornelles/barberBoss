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
exports.PaginatedResult = exports.PaginationMeta = void 0;
const swagger_1 = require("@nestjs/swagger");
class PaginationMeta {
    currentPage;
    itemsPerPage;
    totalItems;
    totalPages;
    hasPreviousPage;
    hasNextPage;
}
exports.PaginationMeta = PaginationMeta;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Página atual' }),
    __metadata("design:type", Number)
], PaginationMeta.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Itens por página' }),
    __metadata("design:type", Number)
], PaginationMeta.prototype, "itemsPerPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de itens' }),
    __metadata("design:type", Number)
], PaginationMeta.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total de páginas' }),
    __metadata("design:type", Number)
], PaginationMeta.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indica se há página anterior' }),
    __metadata("design:type", Boolean)
], PaginationMeta.prototype, "hasPreviousPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indica se há próxima página' }),
    __metadata("design:type", Boolean)
], PaginationMeta.prototype, "hasNextPage", void 0);
class PaginatedResult {
    data;
    meta;
    constructor(data, total, page, limit) {
        this.data = data;
        this.meta = {
            currentPage: page,
            itemsPerPage: limit,
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            hasPreviousPage: page > 1,
            hasNextPage: page < Math.ceil(total / limit),
        };
    }
}
exports.PaginatedResult = PaginatedResult;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dados da página atual', isArray: true }),
    __metadata("design:type", Array)
], PaginatedResult.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Metadados de paginação', type: PaginationMeta }),
    __metadata("design:type", PaginationMeta)
], PaginatedResult.prototype, "meta", void 0);
//# sourceMappingURL=paginated-result.interface.js.map