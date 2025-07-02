import { Components } from '../adapters/controllers/openapi/typings/schema';
import TodoReportBody = Components.Schemas.TodoReportBody;
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { ReportRepository } from './repositories/ReportRepository';
import { UserRepository } from './repositories/UserRepository';
import { LoggedInUser } from '@scheme-verge-inc/firebase-authenticator';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { NotFoundError } from './errors/NotFoundError';
import { TodoReportRepository } from './repositories/TodoReportRepository';

export class SoftDeleteReportById {
    constructor(readonly todoReportRepository: TodoReportRepository) {}

    public execute = async (reportId: string, user?: LoggedInUser) => {
        if (!user) {
            throw new UnauthorizedError();
        }

        const reportById = await this.todoReportRepository.softDeleteById(reportId);
        return reportById;
    };
}
