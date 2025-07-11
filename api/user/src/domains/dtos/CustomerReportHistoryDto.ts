import { Components } from '../../adapters/controllers/openapi/typings/schema';
import TodoReportHistory = Components.Schemas.TodoReportHistory;

export class customerReportHistoryDto {
    name: string | undefined;
    reportLink: string | undefined;
    reportType: 'PDF' | 'LookerStudio' | undefined;
    reportId: string | undefined;
    updatedBy: string | undefined;
    createdAt: string | undefined; // date-time
    updatedAt: string | undefined;

    constructor(
        input: Pick<
            TodoReportHistory,
            'reportHistoryId' | 'name' | 'reportLink' | 'reportType' | 'createdAt' | 'updatedAt'
        > & { updatedBy: string },
    ) {
        this.reportId = input.reportHistoryId;
        this.name = input.name;
        this.reportLink = input.reportLink;
        this.reportType = input.reportType;
        this.updatedBy = input.updatedBy;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }
}
