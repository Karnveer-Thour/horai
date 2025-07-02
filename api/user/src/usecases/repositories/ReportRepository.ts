import { Report } from '../../domains/Report';

export interface ReportRepository {
    findById(reportId: string): Promise<Report | undefined>;
    save(report: Report): Promise<void>;
    getAll(): Promise<Report[]>;
    getAllBySmbId(smbId: string): Promise<Report[]>;
}
