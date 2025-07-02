import { Report, TodoReport } from '@prisma/client';

import { Report as DomainReport, ReportType } from '../../../../../domains/Report';
import { TodoReport as TodoDomainReport, TodoReportType } from '../../../../../domains/TodoReport';

export const transformReportToDomain = (item: Report): DomainReport =>
    new DomainReport({
        reportId: item.reportId,
        reportLink: item.reportLink,
        reportType: item.reportType as ReportType,
        smbId: item.smbId,
        name: item.name,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    });

export const transformTodoReportToDomain = (item: TodoReport): TodoDomainReport =>
    new TodoDomainReport({
        reportId: item.reportId,
        reportLink: item.reportLink,
        reportType: item.reportType as TodoReportType,
        smbId: item.smbId,
        name: item.name,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    });

export const transformReportFromDomain = (d: DomainReport): Report => {
    return {
        reportId: d.reportId,
        reportLink: d.reportLink,
        reportType: d.reportType,
        smbId: d.smbId,
        name: d.name,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
    };
};

export const transformTodoReportFromDomain = (d: TodoDomainReport): TodoReport => {
    return {
        reportId: d.reportId,
        reportLink: d.reportLink,
        reportType: d.reportType,
        smbId: d.smbId,
        name: d.name,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
    };
};
