import { injectable } from 'inversify';
import { TodoReportHistory as DomainReport } from '../../../../domains/TodoReportHistory';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import {
    transformTodoReportHistoryFromDomain,
    transformTodoReportHistoryToDomain,
} from './transformers/TodoReportHistoryTransformers';
import { PaginationObj } from '../../../../domains/dtos/PageinatedListDTO';

@injectable()
export class PostgresTodoReportHistoryRepository {
    public findById = async (reportHistoryId: string): Promise<DomainReport | undefined> => {
        const prisma = dbConnection.getInstance();
        const reportHistory = await prisma.reportHistory.findUnique({
            where: { reportHistoryId },
            include: {
                updatedBy: true,
                report: true,
            },
        });
        if (!reportHistory) return;

        return transformTodoReportHistoryToDomain(reportHistory);
    };

    public save = async (ex: DomainReport): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const reportHistory = transformTodoReportHistoryFromDomain(ex);
        if (!reportHistory) {
            throw new Error('Report history transformation failed');
        }
        await prisma.reportHistory.upsert({
            where: { reportHistoryId: reportHistory?.reportId },
            update: reportHistory,
            create: reportHistory,
        });
    };

    public getAllWithPagination = async (
        pagination: PaginationObj,
        searchText: string,
        reportType?: string,
    ): Promise<DomainReport[]> => {
        const whereCondition: any = {
            report: {}, // filtering inside the related report model
        };

        if (searchText) {
            whereCondition.report.name = {
                contains: searchText,
                mode: 'insensitive',
            };
        }

        if (reportType) {
            whereCondition.report.reportType = reportType;
        }

        const prisma = dbConnection.getInstance();
        const reportHistory = await prisma.reportHistory.findMany({
            skip: (pagination.page - 1) * pagination.pageSize,
            take: Number(pagination.pageSize),
            orderBy: {
                updatedAt: 'desc',
            },
            where: whereCondition,
            include: {
                updatedBy: true,
                report: true,
            },
        });

        return reportHistory.map(transformTodoReportHistoryToDomain);
    };

    public getAllReportHistoryBySmbId = async (smbId: string): Promise<DomainReport[]> => {
        const prisma = dbConnection.getInstance();

        const reportHistory = await prisma.reportHistory.findMany({
            where: {
                report: {
                    smbId: smbId,
                },
            },
            include: {
                updatedBy: true,
                report: true,
            },
        });

        return reportHistory.map(transformTodoReportHistoryToDomain);
    };

    public getAllReportHistoryByReportId = async (reportId: string): Promise<DomainReport[]> => {
        const prisma = dbConnection.getInstance();
        const reportHistory = await prisma.reportHistory.findMany({
            where: { reportId },
            include: {
                updatedBy: true,
                report: true,
            },
        });

        return reportHistory.map(transformTodoReportHistoryToDomain);
    };
}
