import { adminReportHistoryDto } from './dtos/AdminReportHistoryDto';
import { customerReportHistoryDto } from './dtos/CustomerReportHistoryDto';

export class TodoReportHistory {
    reportHistoryId: string;
    reportId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    smbId: string | undefined;
    name: string | undefined;
    reportLink: string | undefined;
    reportType: 'PDF' | 'LookerStudio' | undefined;

    constructor(
        input: Pick<
            TodoReportHistory,
            | 'reportHistoryId'
            | 'reportId'
            | 'userId'
            | 'smbId'
            | 'createdAt'
            | 'updatedAt'
            | 'name'
            | 'reportLink'
            | 'reportType'
        >,
    ) {
        Object.assign(this, input);
        this.reportHistoryId = input.reportHistoryId;
        this.reportId = input.reportId;
        this.userId = input.userId;
        this.name = input.name;
        this.smbId = input.smbId;
        this.reportLink = input.reportLink;
        this.reportType = input.reportType;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }

    public static create = (reportHistoryId: string, reportId: string, userId: string, now: Date): TodoReportHistory =>
        new TodoReportHistory({
            reportHistoryId,
            reportId,
            userId,
            createdAt: now,
            updatedAt: now,
            smbId: undefined,
            name: undefined,
            reportLink: undefined,
            reportType: undefined,
        });

    public toCustomerReportHistoryDto = (): customerReportHistoryDto => {
        return new customerReportHistoryDto({
            reportHistoryId: this.reportHistoryId,
            name: this.name ?? '',
            reportLink: this.reportLink ?? '',
            reportType: this.reportType ?? 'PDF',
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            updatedBy: this.userId ?? '',
        });
    };

    public toAdminReportDto = (): adminReportHistoryDto => {
        return new adminReportHistoryDto({
            reportHistoryId: this.reportHistoryId,
            name: this.name ?? '',
            reportLink: this.reportLink ?? '',
            reportType: this.reportType ?? 'PDF',
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
            updatedBy: this.userId ?? '',
            smbId: this.smbId ?? '',
        });
    };
}
