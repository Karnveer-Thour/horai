import { Components } from '../adapters/controllers/openapi/typings/schema';
import TodoReportBody = Components.Schemas.TodoReportBody;
import { LoggedInUser } from '@scheme-verge-inc/firebase-authenticator';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { TodoReportRepository } from './repositories/TodoReportRepository';

export class GetAllReports {
    constructor(readonly todoReportRepository: TodoReportRepository) {}

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
        const reports = await this.todoReportRepository.getAllWithPagination(
            { page: page, pageSize: limit },
            searchText,
            reportType,
        );
        return reports;
    };
}
