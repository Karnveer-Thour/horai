import { adminReportHistoryDto } from './dtos/AdminReportHistoryDto';
import { customerReportHistoryDto } from './dtos/CustomerReportHistoryDto';

export class TodoReportHistory {
  reportHistoryId: string;
  reportId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  report?: {
    reportId: string;
    smbId?: string;
    name?: string;
    reportLink?: string;
    reportType?: 'PDF' | 'LookerStudio';
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };

  updatedBy?: {
    userId: string;
    name?: string;
    email?: string;
  };

  constructor(input: {
    reportHistoryId: string;
    reportId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    report?: TodoReportHistory['report'];
    updatedBy?: TodoReportHistory['updatedBy'];
  }) {
    this.reportHistoryId = input.reportHistoryId;
    this.reportId = input.reportId;
    this.userId = input.userId;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.report = input.report;
    this.updatedBy = input.updatedBy;
  }

  public static create = (
    reportHistoryId: string,
    reportId: string,
    userId: string,
    now: Date,
    report?: TodoReportHistory['report'],
    updatedBy?: TodoReportHistory['updatedBy'],
  ): TodoReportHistory =>
    new TodoReportHistory({
      reportHistoryId,
      reportId,
      userId,
      createdAt: now,
      updatedAt: now,
      report,
      updatedBy,
    });

  public toCustomerReportHistoryDto = (): customerReportHistoryDto => {
    return new customerReportHistoryDto({
      reportHistoryId: this.reportHistoryId,
      name: this.report?.name ?? '',
      reportLink: this.report?.reportLink ?? '',
      reportType: this.report?.reportType ?? 'PDF',
      report: this.report?.reportId ?? '',
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      reportId: this.reportId,
      updatedBy: this.updatedBy ?? this.userId ?? '',
    });
  };

  public toAdminReportDto = (): adminReportHistoryDto => {
    return new adminReportHistoryDto({
      reportHistoryId: this.reportHistoryId,
      name: this.report?.name ?? '',
      reportLink: this.report?.reportLink ?? '',
      reportType: this.report?.reportType ?? 'PDF',
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      updatedBy: this.updatedBy?.name ?? this.userId ?? '',
      smbId: this.report?.smbId ?? '',
    });
  };
}
