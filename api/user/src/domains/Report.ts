export enum ReportType {
    PDF = 'PDF',
    LookerStudio = 'LookerStudio',
}

export class Report {
    reportId: string;
    smbId: string;
    reportLink: string;
    name: string;
    reportType: ReportType;
    createdAt: Date;
    updatedAt: Date;

    constructor(input: Pick<Report, 'reportId' | 'smbId' | 'createdAt' | 'updatedAt'> & ReportUpdatableField) {
        Object.assign(this, input);
        this.reportId = input.reportId;
        this.smbId = input.smbId;
        this.reportLink = input.reportLink;
        this.name = input.name;
        this.reportType = input.reportType;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }

    public static create = (reportId: string, smbId: string, item: ReportUpdatableField, now: Date): Report =>
        new Report({
            reportId,
            smbId,
            ...item,
            createdAt: now,
            updatedAt: now,
        });

    public update = (input: ReportUpdatableField, now: Date): Report => {
        this.name = input.name;
        this.reportLink = input.reportLink;
        this.reportType = input.reportType;
        this.updatedAt = now;
        return this;
    };
}

export type ReportUpdatableField = Pick<Report, 'name' | 'reportLink' | 'reportType'>;
