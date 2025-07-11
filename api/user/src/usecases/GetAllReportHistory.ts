import { LoggedInUser } from '../domains/LoggedInUser';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { TodoReportHistoryRepository } from './repositories/TodoReportRepositoryHistory';

export class GetAllReportsHistories {
    constructor(readonly todoReportHistoryRepository: TodoReportHistoryRepository) {}

    public execute = async (
        page: number = 1,
        limit: number = 10,
        searchText: string,
        reportType: string,
        user?: LoggedInUser,
    ) => {
        if (!user) {
            throw new UnauthorizedError();
        }
        const reportsHistories = await this.todoReportHistoryRepository.getAllWithPagination(
            { page: page, pageSize: limit },
            searchText,
            reportType,
        );
        return reportsHistories;
    };
}
