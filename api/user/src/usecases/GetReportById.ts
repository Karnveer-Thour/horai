import { Components } from '../adapters/controllers/openapi/typings/schema';
import TodoReportBody = Components.Schemas.TodoReportBody;
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { ReportRepository } from './repositories/ReportRepository';
import { UserRepository } from './repositories/UserRepository';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { NotFoundError } from './errors/NotFoundError';
import { TodoReportRepository } from './repositories/TodoReportRepository';
import { TodoReport } from '../domains/TodoReport';
import { LoggedInUser } from '../domains/LoggedInUser';

export class GetReportById {
    constructor(readonly todoReportRepository: TodoReportRepository, readonly dateTimeRepository: DateTimeRepository) {}

    public execute = async (reportId: string, user?: LoggedInUser) => {
        if (!user) {
            throw new UnauthorizedError();
        }

        let report: TodoReport | undefined;
        report = await this.todoReportRepository.findById(reportId);
        if (!report) throw NotFoundError.model(`report`, `reportId`, reportId);

        const now = this.dateTimeRepository.now();

        report = TodoReport.create(
            reportId,
            report.smbId,
            {
                ...report,
                reportType: report.reportType as TodoReport['reportType'],
            },
            now,
        );

        if (user.isSv() || user.isSmb() || user.isAmo()) {
            return report.toAdminReportDto();
        } else {
            return report.toCustomerReportDto();
        }
    };
}
