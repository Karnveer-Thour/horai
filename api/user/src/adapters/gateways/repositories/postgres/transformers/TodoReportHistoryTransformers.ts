import { ReportHistory } from '@prisma/client';
import { TodoReportHistory as HistoryDomainReport } from '../../../../../domains/TodoReportHistory';

export const transformTodoReportHistoryToDomain = (item: any): HistoryDomainReport =>
    new HistoryDomainReport({
        reportId: item.reportId,
        report: item?.report,
        userId: item.userId,
        reportHistoryId: item.reportHistoryId,
        updatedBy: item.updatedBy,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    });

export const transformTodoReportHistoryFromDomain = (d: HistoryDomainReport): ReportHistory => {
    return {
        reportId: d.reportId,
        reportHistoryId: d.reportHistoryId,
        userId: d.userId,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
    };
};
