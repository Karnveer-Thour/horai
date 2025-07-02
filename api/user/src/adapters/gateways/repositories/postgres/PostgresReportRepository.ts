import { injectable } from 'inversify';
import { Report as DomainReport } from '../../../../domains/Report';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { ReportRepository } from '../../../../usecases/repositories/ReportRepository';
import { transformReportFromDomain, transformReportToDomain } from './transformers/ReportTransformers';

@injectable()
export class PostgresReportRepository implements ReportRepository {
    public findById = async (reportId: string): Promise<DomainReport | undefined> => {
        const prisma = dbConnection.getInstance();
        const report = await prisma.report.findUnique({ where: { reportId } });
        if (!report) return;

        return transformReportToDomain(report);
    };

    public save = async (ex: DomainReport): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const report = transformReportFromDomain(ex);

        await prisma.report.upsert({
            where: { reportId: report.reportId },
            update: report,
            create: report,
        });
    };

    public getAll = async (): Promise<DomainReport[]> => {
        const prisma = dbConnection.getInstance();
        const reports = await prisma.report.findMany();

        return reports.map(transformReportToDomain);
    };

    public getAllBySmbId = async (smbId: string): Promise<DomainReport[]> => {
        const prisma = dbConnection.getInstance();
        const reports = await prisma.report.findMany({ where: { smbId } });

        return reports.map(transformReportToDomain);
    };
}
