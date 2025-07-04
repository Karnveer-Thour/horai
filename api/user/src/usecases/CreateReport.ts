import { DateTimeRepository } from './repositories/DateTimeRepository';
import { ReportRepository } from './repositories/ReportRepository';
import * as uuid from 'uuid';
import { Components } from '../adapters/controllers/openapi/typings/schema';
import TodoReportBody = Components.Schemas.TodoReportBody;
import { LoggedInUser } from '../domains/LoggedInUser';
import { UserRepository } from './repositories/UserRepository';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { TodoReportRepository } from './repositories/TodoReportRepository';
import { TodoReport } from '../domains/TodoReport';

export class CreateReport {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly todoreportRepository: TodoReportRepository,
        readonly userRepository: UserRepository,
    ) {}

    public execute = async (input: TodoReportBody, user?: LoggedInUser) => {
        if (!user) {
            throw new UnauthorizedError();
        }

        if (!user.isSv()) {
            throw new UnauthorizedError('User not allowed');
        }

        const now = this.dateTimeRepository.now();
        const reportId = uuid.v4();
        const report = TodoReport.create(
            reportId,
            input.Smbid,
            {
                ...input,
                reportType: input.reportType as TodoReport['reportType'],
            },
            now,
        );
        await this.todoreportRepository.save(report);

        return report.toAdminReportDto();
    };
}
