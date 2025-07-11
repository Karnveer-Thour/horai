import { Components } from '../../adapters/controllers/openapi/typings/schema';
import TodoReportHistoryBody = Components.Schemas.TodoReportHistoryBody;
import TodoReportHistory = Components.Schemas.TodoReportHistory;

export class adminReportHistoryDto {
    name: string | undefined;
    smbId: string | undefined;
    reportHistoryId: string | undefined;
    reportLink: string | undefined;
    reportType: 'PDF' | 'LookerStudio' | undefined;
    reportId: string | undefined;
    updatedBy: string | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;

    constructor(
        input: Pick<
            TodoReportHistory,
            'reportHistoryId' | 'name' | 'reportLink' | 'reportType' | 'createdAt' | 'updatedAt'
        > & { updatedBy: string; smbId: string },
    ) {
        this.reportId = input.reportHistoryId;
        this.reportHistoryId = input.reportHistoryId;
        this.smbId = input.smbId;
        this.name = input.name;
        this.reportLink = input.reportLink;
        this.reportType = input.reportType;
        this.updatedBy = input.updatedBy;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }
}
