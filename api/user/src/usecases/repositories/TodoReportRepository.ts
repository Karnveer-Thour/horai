import { PaginationObj } from '../../domains/dtos/PageinatedListDTO';
import { TodoReport } from '../../domains/TodoReport';
import { TodoReport as DomainReport } from '../../domains/TodoReport';
import { TodoReportHistory } from '../../domains/TodoReportHistory';

export interface TodoReportRepository {
    findById(reportId: string): Promise<TodoReport | undefined>;
    saveWithHistory(report: DomainReport, reportHistory: TodoReportHistory): Promise<void>;
    save(report: TodoReport, reportHistory?: TodoReportHistory): Promise<void>;
    getAllWithPagination(pagination: PaginationObj, searchText: string, reportType: string): Promise<TodoReport[]>;
    getAllBySmbId(smbId: string): Promise<TodoReport[]>;
    softDeleteById(reportId: string, now: Date): Promise<void>;
}
