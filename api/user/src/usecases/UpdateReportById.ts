import { DateTimeRepository } from './repositories/DateTimeRepository';
import { ReportRepository } from './repositories/ReportRepository';
import * as uuid from 'uuid';
import { Components } from '../adapters/controllers/openapi/typings/schema';
import TodoReportBody = Components.Schemas.TodoReportBody;
import { LoggedInUser } from '../domains/LoggedInUser';
import { UserRepository } from './repositories/UserRepository';
import { NotFoundError } from './errors/NotFoundError';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { TodoReportRepository } from './repositories/TodoReportRepository';
import { TodoReport } from '../domains/TodoReport';

export class UpdateReportById {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly todoReportRepository: TodoReportRepository,
        readonly userRepository: UserRepository,
    ) {}

    public execute = async (input: TodoReportBody, reportId: string, user?: LoggedInUser) => {
        if (!user) {
            throw new UnauthorizedError();
        }
        const now = this.dateTimeRepository.now();

        const savedReport = await this.todoReportRepository.findById(reportId);

        if (!savedReport) {
            throw new NotFoundError(`report not found for id: ${reportId}`);
        }
        const updatedReport = savedReport.update(
            {
                ...savedReport,
                ...input,
                reportType: input.reportType as TodoReport['reportType'],
            },
            now,
        );
        await this.todoReportRepository.save(updatedReport);
    };
}
