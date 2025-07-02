import { LoggedInUser } from '../domains/LoggedInUser';
import { Report, ReportUpdatableField } from '../domains/Report';
import { NotFoundError } from './errors/NotFoundError';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { ReportRepository } from './repositories/ReportRepository';
import { SmbRepository } from './repositories/SmbRepository';

export class SaveReport {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly smbRepository: SmbRepository,
        readonly reportRepository: ReportRepository,
    ) {}

    public execute = async (
        reportId: string,
        smbId: string,
        input: ReportUpdatableField,
        user?: LoggedInUser,
    ): Promise<void> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }

        const savedSmb = await this.smbRepository.findById(smbId);
        if (!savedSmb) {
            throw new NotFoundError(`Smb not found for id: ${smbId}`);
        }

        const savedReport = await this.reportRepository.findById(smbId);
        const now = this.dateTimeRepository.now();

        const report = savedReport ? savedReport.update(input, now) : Report.create(reportId, smbId, input, now);

        await this.reportRepository.save(report);
    };
}
