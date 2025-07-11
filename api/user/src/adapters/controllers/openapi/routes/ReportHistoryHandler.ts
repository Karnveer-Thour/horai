import {
    dateTimeRepository,
    todoReportHistoryRepository,
} from '../../../../infrastructures/config/IoC/inversify.config';
import { GetAllReportsHistories } from '../../../../usecases/GetAllReportHistory';
import { GetAllReportHistoryBySmbId } from '../../../../usecases/GetAllReportHistoryBySmbId';
import { GetReportHistoryById } from '../../../../usecases/GetReportHistoryById';
import { Service } from './Service';

export const getReportHistoryById = async (input: { authorization: string; reportHistoryId: string }) => {
    try {
        const usecase = new GetReportHistoryById(todoReportHistoryRepository, dateTimeRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const res = await usecase.execute(input.reportHistoryId, loggedInUser);
        return Service.successResponse(res, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const getReportsHistory = async (input: {
    authorization: string;
    page: number;
    limit: number;
    searchText: string;
    reportType: string;
}) => {
    try {
        const usecase = new GetAllReportsHistories(todoReportHistoryRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const res = await usecase.execute(input.page, input.limit, input.searchText, input.reportType, loggedInUser);
        return Service.successResponse(res, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const getAllReportHistoriesBySmbId = async (input: { authorization: string; SmbId: string }) => {
    try {
        const usecase = new GetAllReportHistoryBySmbId(todoReportHistoryRepository, dateTimeRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const res = await usecase.execute(input.SmbId, loggedInUser);
        return Service.successResponse(res, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const getAllReportHistoriesByReportId = async (input: { authorization: string; ReportId: string }) => {
    try {
        const usecase = new GetAllReportHistoryBySmbId(todoReportHistoryRepository, dateTimeRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const res = await usecase.execute(input.ReportId, loggedInUser);
        return Service.successResponse(res, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};
