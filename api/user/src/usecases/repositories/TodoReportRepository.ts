import { TodoReport } from '../../domains/TodoReport';

export interface TodoReportRepository {
    findById(reportId: string): Promise<TodoReport | undefined>;
    save(report: TodoReport): Promise<void>;
    getAll(): Promise<TodoReport[]>;
    getAllBySmbId(smbId: string): Promise<TodoReport[]>;
    softDeleteById(reportId: string): Promise<void>;
}
