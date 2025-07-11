import { ReportHistory } from '@prisma/client';
import { LoggedInUser } from '../domains/LoggedInUser';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { TodoReportHistoryRepository } from './repositories/TodoReportRepositoryHistory';

export class GetAllReportHistoryBySmbId {
    constructor(
        readonly todoReportHistoryRepository: TodoReportHistoryRepository,
        readonly dateTimeRepository: DateTimeRepository,
    ) {}

    public execute = async (reportId: string, user?: LoggedInUser) => {
        if (!user) {
            throw new UnauthorizedError();
        }

        const reportHistories = await this.todoReportHistoryRepository.getAllReportHistoryByReportId(reportId);

        return reportHistories;
    };
}
