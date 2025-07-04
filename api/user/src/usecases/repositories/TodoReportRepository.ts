import { PaginationObj } from '../../domains/dtos/PageinatedListDTO';
import { TodoReport } from '../../domains/TodoReport';

export interface TodoReportRepository {
    findById(reportId: string): Promise<TodoReport | undefined>;
    save(report: TodoReport): Promise<void>;
    getAllWithPagination(pagination: PaginationObj, searchText: string, reportType: string): Promise<TodoReport[]>;
    getAllBySmbId(smbId: string): Promise<TodoReport[]>;
    softDeleteById(reportId: string, now: Date): Promise<void>;
}
