export class customerReportHistoryDto {
  name: string | undefined;
  reportLink: string | undefined;
  reportType: 'PDF' | 'LookerStudio' | undefined;
  reportId: string | undefined;
  updatedBy: string | undefined;
  createdAt: string | undefined;
  updatedAt: any;
  report?: any;
  reportHistoryId: string;

  constructor(
    input: {
      reportHistoryId: string;
      reportId: string;
      name?: string;
      reportLink?: string;
      reportType?: 'PDF' | 'LookerStudio';
      report?: any;
      createdAt: string;
      updatedAt: string;
      updatedBy: any;
    },
  ) {
    this.reportHistoryId = input.reportHistoryId;
    this.reportId = input.reportId;
    this.name = input.name;
    this.reportLink = input.reportLink;
    this.reportType = input.reportType;
    this.report = input.report;
    this.updatedBy = input.updatedBy;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }
}
