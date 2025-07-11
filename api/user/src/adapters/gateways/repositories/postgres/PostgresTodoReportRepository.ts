import { injectable } from 'inversify';
import { TodoReport as DomainReport } from '../../../../domains/TodoReport';
import { TodoReportHistory } from '../../../../domains/TodoReportHistory';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { transformTodoReportFromDomain, transformTodoReportToDomain } from './transformers/ReportTransformers';
import { PaginationObj } from '../../../../domains/dtos/PageinatedListDTO';

@injectable()
export class PostgresTodoReportRepository {
    public findById = async (reportId: string): Promise<DomainReport | undefined> => {
        const prisma = dbConnection.getInstance();
        const report = await prisma.todoReport.findUnique({ where: { reportId } });
        if (!report) return;

        return transformTodoReportToDomain(report);
    };

    public saveWithHistory = async (report: DomainReport, reportHistory: TodoReportHistory): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const todoReport = transformTodoReportFromDomain(report);

        await prisma.$transaction([
            prisma.todoReport.create({
                data: todoReport,
            }),
            prisma.reportHistory.create({
                data: reportHistory,
            }),
        ]);
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

    public getAllWithPagination = async (
        pagination: PaginationObj,
        searchText: string,
        reportType?: string,
    ): Promise<DomainReport[]> => {
        const whereCondition: any = {
            isActive: true,
        };

        if (searchText) {
            whereCondition.name = {
                contains: searchText,
                mode: 'insensitive',
            };
        }

        if (reportType) {
            whereCondition.reportType = reportType;
        }

        const prisma = dbConnection.getInstance();
        const reports = await prisma.todoReport.findMany({
            skip: (pagination.page - 1) * pagination.pageSize,
            take: Number(pagination.pageSize),
            orderBy: {
                updatedAt: 'desc',
            },
            where: whereCondition,
        });

        return reports.map(transformTodoReportToDomain);
    };

    public getAllBySmbId = async (smbId: string): Promise<DomainReport[]> => {
        const prisma = dbConnection.getInstance();
        const reports = await prisma.todoReport.findMany({ where: { smbId } });

        return reports.map(transformTodoReportToDomain);
    };

    public softDeleteById = async (reportId: string, now: Date) => {
        const prisma = dbConnection.getInstance();

        await prisma.todoReport.update({
            data: { isActive: false, updatedAt: now },
            where: { reportId },
        });
    };
}
