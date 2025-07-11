import { ReportHistory } from '@prisma/client';

import { TodoReportHistory as HistoryDomainReport } from '../../../../../domains/TodoReportHistory';
import { TodoReportType } from '../../../../../domains/TodoReport';

export const transformTodoReportHistoryToDomain = (item: ReportHistory): HistoryDomainReport =>
    new HistoryDomainReport({
        reportId: item.reportId,
        reportHistoryId: item.reportHistoryId,
        userId: item.userId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        smbId: undefined,
        name: undefined,
        reportLink: undefined,
        reportType: undefined,
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
