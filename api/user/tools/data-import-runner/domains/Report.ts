import { ReportType } from '../../../src/domains/Report';

export type Report = {
    reportId: string;
    smbId: string;
    reportLink: string;
    name: string;
    reportType: ReportType;
};
