import { FinanceReportService } from './finance-report.service';
import { FinanceSummaryDto } from './dto/finance-summary.dto';
export declare class FinanceReportController {
    private readonly financeReportService;
    constructor(financeReportService: FinanceReportService);
    getFinanceSummary(barberId: string): Promise<FinanceSummaryDto>;
}
