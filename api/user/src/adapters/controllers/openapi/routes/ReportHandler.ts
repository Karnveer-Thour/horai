import { ReportType } from '../../../../domains/Report';
import { NotFoundError } from '../../../../usecases/errors/NotFoundError';
import { GetSmbReportsById } from '../../../../usecases/GetSmbReportsById';
import { SaveReport } from '../../../../usecases/UpdateReport';
import { PostgresReportRepository } from '../../../gateways/repositories/postgres/PostgresReportRepository';
import { PostgresSmbRepository } from '../../../gateways/repositories/postgres/PostgresSmbRepository';
import { SystemDateTimeRepository } from '../../../gateways/repositories/SystemDateTimeRepository';
import { Components } from '../typings/schema';
import { Service, ServiceResponse } from './Service';

import ReportUpdateBody = Components.Schemas.ReportUpdateBody;

export const getReportsBySmbId = async (input: { authorization: string; smbId: string }): Promise<ServiceResponse> => {
    try {
        const usecase = new GetSmbReportsById(new PostgresSmbRepository(), new PostgresReportRepository());
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const res = await usecase.execute(input.smbId, loggedInUser);

        return Service.successResponse(res);
    } catch (e: any) {
        if (e instanceof NotFoundError) {
            return Service.errorResponse(e, 404);
        }
        return Service.errorResponse(e);
    }
};

export const updateReport = async (input: {
    smbId: string;
    reportId: string;
    authorization: string;
    reportUpdateBody: ReportUpdateBody;
}): Promise<ServiceResponse> => {
    try {
        const usecase = new SaveReport(
            new SystemDateTimeRepository(),
            new PostgresSmbRepository(),
            new PostgresReportRepository(),
        );
        const loggedInUser = await Service.loggedInUser(input.authorization);

        await usecase.execute(
            input.reportId,
            input.smbId,
            {
                reportLink: input.reportUpdateBody.reportLink,
                reportType: input.reportUpdateBody.reportType as ReportType,
                name: input.reportUpdateBody.name,
            },
            loggedInUser,
        );

        return Service.successResponse({}, 204);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};
