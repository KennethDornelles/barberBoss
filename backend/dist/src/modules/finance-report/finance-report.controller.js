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
exports.FinanceReportController = void 0;
const common_1 = require("@nestjs/common");
const finance_report_service_1 = require("./finance-report.service");
const finance_summary_dto_1 = require("./dto/finance-summary.dto");
const swagger_1 = require("@nestjs/swagger");
let FinanceReportController = class FinanceReportController {
    financeReportService;
    constructor(financeReportService) {
        this.financeReportService = financeReportService;
    }
    async getFinanceSummary(barberId) {
        return this.financeReportService.getFinanceSummary(barberId);
    }
};
exports.FinanceReportController = FinanceReportController;
__decorate([
    (0, common_1.Get)('summary'),
    (0, swagger_1.ApiQuery)({ name: 'barberId', required: true }),
    (0, swagger_1.ApiOkResponse)({ type: finance_summary_dto_1.FinanceSummaryDto }),
    __param(0, (0, common_1.Query)('barberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FinanceReportController.prototype, "getFinanceSummary", null);
exports.FinanceReportController = FinanceReportController = __decorate([
    (0, swagger_1.ApiTags)('finance-report'),
    (0, common_1.Controller)('finance-report'),
    __metadata("design:paramtypes", [finance_report_service_1.FinanceReportService])
], FinanceReportController);
//# sourceMappingURL=finance-report.controller.js.map