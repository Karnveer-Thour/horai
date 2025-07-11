import { UnauthorizedError } from './errors/UnauthorizedError';
import { TodoReportHistoryRepository } from './repositories/TodoReportRepositoryHistory';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { ReportHistory } from '@prisma/client';
import { NotFoundError } from './errors/NotFoundError';
import { TodoReportHistory } from '../domains/TodoReportHistory';
import { LoggedInUser } from '../domains/LoggedInUser';

export class GetReportHistoryById {
    constructor(
        readonly todoReportHistoryRepository: TodoReportHistoryRepository,
        readonly dateTimeRepository: DateTimeRepository,
    ) {}

    public execute = async (reportHistoryId: string, user?: LoggedInUser) => {
        if (!user) {
            throw new UnauthorizedError();
        }

        const reportHistory = await this.todoReportHistoryRepository.findById(reportHistoryId);
        if (!reportHistory) throw NotFoundError.model(`report`, `reportId`, reportHistoryId);

        const now = this.dateTimeRepository.now();

        const res = TodoReportHistory.create(
            reportHistory.reportHistoryId,
            reportHistory.userId,
            reportHistory.reportId,
            now,
        );

        if (user.isSv() || user.isSmb() || user.isAmo()) {
            return res.toAdminReportDto();
        } else {
            return res.toCustomerReportHistoryDto();
        }
    };
}
