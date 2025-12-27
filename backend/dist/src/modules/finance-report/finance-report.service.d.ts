import { PrismaService } from '../../prisma/prisma.service';
import { FinanceSummaryDto } from './dto/finance-summary.dto';
export declare class FinanceReportService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getFinanceSummary(barberId: string): Promise<FinanceSummaryDto>;
}
