import { customerReportDto } from './dtos/customerReportDto';

export enum TodoReportType {
    PDF = 'PDF',
    LookerStudio = 'LookerStudio',
}

export class TodoReport {
    reportId: string;
    smbId: string;
    reportLink: string;
    name: string;
    reportType: TodoReportType;
    createdAt: Date;
    updatedAt: Date;

    constructor(input: Pick<TodoReport, 'reportId' | 'smbId' | 'createdAt' | 'updatedAt'> & ReportUpdatableField) {
        Object.assign(this, input);
        this.reportId = input.reportId;
        this.smbId = input.smbId;
        this.reportLink = input.reportLink;
        this.name = input.name;
        this.reportType = input.reportType;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }

    public static create = (reportId: string, smbId: string, item: ReportUpdatableField, now: Date): TodoReport =>
        new TodoReport({
            reportId,
            smbId,
            ...item,
            createdAt: now,
            updatedAt: now,
        });

    public update = (input: ReportUpdatableField, now: Date): TodoReport => {
        this.name = input.name;
        this.reportLink = input.reportLink;
        this.reportType = input.reportType;
        this.updatedAt = now;
        return this;
    };

    public toCustomerReportDto = (): customerReportDto => {
        return new customerReportDto({
            reportId: this.reportId,
            name: this.name,
            Smbid: this.smbId,
            reportLink: this.reportLink,
            reportType: this.reportType,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        });
    };

    public toAdminReportDto = (): customerReportDto => {
        return new customerReportDto({
            reportId: this.reportId,
            name: this.name,
            Smbid: this.smbId,
            reportLink: this.reportLink,
            reportType: this.reportType,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        });
    };
}

export type ReportUpdatableField = Pick<TodoReport, 'name' | 'reportLink' | 'reportType'>;
