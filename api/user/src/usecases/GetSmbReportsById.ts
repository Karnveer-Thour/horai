import { LoggedInUser } from '../domains/LoggedInUser';
import { Report } from '../domains/Report';
import { NotFoundError } from './errors/NotFoundError';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { ReportRepository } from './repositories/ReportRepository';
import { SmbRepository } from './repositories/SmbRepository';

export class GetSmbReportsById {
    constructor(readonly smbRepository: SmbRepository, readonly reportRepository: ReportRepository) {}

    public execute = async (smbId: string, user?: LoggedInUser): Promise<Report[]> => {
        if (!user || !user.isSmb()) {
            throw new UnauthorizedError();
        }

        const smbItem = await this.smbRepository.findById(smbId);
        if (!smbItem) throw NotFoundError.model(`SmbItem`, `smbItemId`, smbId);

        const reports = await this.reportRepository.getAllBySmbId(smbItem.smbId);

        return reports;
    };
}
