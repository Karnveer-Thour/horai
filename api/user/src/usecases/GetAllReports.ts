import { Components } from '../adapters/controllers/openapi/typings/schema';
import TodoReportBody = Components.Schemas.TodoReportBody;
import { LoggedInUser } from '@scheme-verge-inc/firebase-authenticator';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { NotFoundError } from './errors/NotFoundError';
import { TodoReportRepository } from './repositories/TodoReportRepository';

export class GetAllReports {
    constructor(readonly todoReportRepository: TodoReportRepository) {}

    public execute = async (user?: LoggedInUser) => {
        if (!user) {
            throw new UnauthorizedError();
        }
        const reports = await this.todoReportRepository.getAll();
        return reports;
    };
}
