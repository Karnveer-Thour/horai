import { PaginationObj } from '../../domains/dtos/PageinatedListDTO';
import { TodoReportHistory as DomainReport } from '../../domains/TodoReportHistory';

export interface TodoReportHistoryRepository {
    findById(reportHistoryId: string): Promise<DomainReport | undefined>;
    save(report: DomainReport): Promise<void>;
    getAllWithPagination(pagination: PaginationObj, searchText: string, reportType: string): Promise<DomainReport[]>;
    getAllReportHistoryBySmbId(smbId: string): Promise<DomainReport[]>;
    getAllReportHistoryByReportId(reportId: string): Promise<DomainReport[]>;
}
