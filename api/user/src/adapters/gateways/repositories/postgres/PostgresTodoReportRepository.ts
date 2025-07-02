import { injectable } from 'inversify';
import { TodoReport as DomainReport } from '../../../../domains/TodoReport';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { transformTodoReportFromDomain, transformTodoReportToDomain } from './transformers/ReportTransformers';

@injectable()
export class PostgresTodoReportRepository {
    public findById = async (reportId: string): Promise<DomainReport | undefined> => {
        const prisma = dbConnection.getInstance();
        const report = await prisma.todoReport.findUnique({ where: { reportId } });
        if (!report) return;

        return transformTodoReportToDomain(report);
    };

    public save = async (ex: DomainReport): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const report = transformTodoReportFromDomain(ex);

        await prisma.todoReport.upsert({
            where: { reportId: report?.reportId },
            update: report,
            create: report,
        });
    };

    public getAll = async (): Promise<DomainReport[]> => {
        const prisma = dbConnection.getInstance();
        const reports = await prisma.todoReport.findMany({
            where: {
                isActive: true,
            },
        });

        return reports.map(transformTodoReportToDomain);
    };

    public getAllBySmbId = async (smbId: string): Promise<DomainReport[]> => {
        const prisma = dbConnection.getInstance();
        const reports = await prisma.todoReport.findMany({ where: { smbId } });

        return reports.map(transformTodoReportToDomain);
    };

    public softDeleteById = async (reportId: string) => {
        const now = new Date();
        const prisma = dbConnection.getInstance();

        await prisma.todoReport.update({
            data: { isActive: false, updatedAt: now },
            where: { reportId },
        });
    };
}
