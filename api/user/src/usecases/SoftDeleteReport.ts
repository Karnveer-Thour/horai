import { Components } from '../adapters/controllers/openapi/typings/schema';
import TodoReportBody = Components.Schemas.TodoReportBody;
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { ReportRepository } from './repositories/ReportRepository';
import { UserRepository } from './repositories/UserRepository';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { NotFoundError } from './errors/NotFoundError';
import { TodoReportRepository } from './repositories/TodoReportRepository';
import { LoggedInUser } from '../domains/LoggedInUser';

export class SoftDeleteReportById {
    constructor(readonly todoReportRepository: TodoReportRepository, readonly dateTimeRepository: DateTimeRepository) {}

    public execute = async (reportId: string, user?: LoggedInUser) => {
        if (!user) {
            throw new UnauthorizedError();
        }

        if (!user.isSv()) {
            throw new UnauthorizedError('User not allowed');
        }

        const now = this.dateTimeRepository.now();

        const reportById = await this.todoReportRepository.softDeleteById(reportId, now);
        return reportById;
    };
}
