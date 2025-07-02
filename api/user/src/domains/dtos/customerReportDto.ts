import { Components } from '../../adapters/controllers/openapi/typings/schema';
import TodoReport = Components.Schemas.TodoReport;

export class customerReportDto {
    name: string | undefined;
    Smbid: string | undefined;
    reportLink: string | undefined;
    reportType: 'PDF' | 'LookerStudio' | undefined;
    reportId: string | undefined;
    createdAt: string | undefined; // date-time
    updatedAt: string | undefined;

    constructor(input: TodoReport) {
        this.reportId = input.reportType;
        this.name = input.name;
        this.reportLink = input.reportLink;
        this.reportType = input.reportType;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }
}
