import { Components } from '../typings/schema';
import TodoReportBody = Components.Schemas.TodoReportBody;
import TodoReportUpdateBody = Components.Schemas.TodoReportBody;
import { CreateReport } from '../../../../usecases/CreateReport';
import {
    dateTimeRepository,
    todoReportRepository,
    userRepository,
    todoReportHistoryRepository,
} from '../../../../infrastructures/config/IoC/inversify.config';
import { Service } from './Service';
import { GetReportById } from '../../../../usecases/GetReportById';
import { SoftDeleteReportById } from '../../../../usecases/SoftDeleteReport';
import { UpdateReportById } from '../../../../usecases/UpdateReportById';
import { GetAllReports } from '../../../../usecases/GetAllReports';

export const createReport = async (input: { authorization: string; todoReportBody: TodoReportBody }) => {
    try {
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const usecase = new CreateReport(
            dateTimeRepository,
            todoReportRepository,
            userRepository,
        );
        const res = await usecase.execute(input.todoReportBody, loggedInUser);
        return Service.successResponse(res, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const updateReportById = async (input: {
    authorization: string;
    todoReportUpdateBody: TodoReportUpdateBody;
    reportId: string;
}) => {
    try {
        const usecase = new UpdateReportById(dateTimeRepository, todoReportRepository, userRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const res = await usecase.execute(input.todoReportUpdateBody, input.reportId, loggedInUser);
        return Service.successResponse({}, 204);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const getReportById = async (input: { authorization: string; reportId: string }) => {
    try {
        const usecase = new GetReportById(todoReportRepository, dateTimeRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const res = await usecase.execute(input.reportId, loggedInUser);
        return Service.successResponse(res, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const getAllReports = async (input: {
    authorization: string;
    page: number;
    limit: number;
    searchText: string;
    reportType: string;
}) => {
    try {
        const usecase = new GetAllReports(todoReportRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const res = await usecase.execute(input.page, input.limit, input.searchText, input.reportType, loggedInUser);
        return Service.successResponse(res, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const softDeleteReportById = async (input: { authorization: string; reportId: string }) => {
    try {
        const usecase = new SoftDeleteReportById(todoReportRepository, dateTimeRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const res = await usecase.execute(input.reportId, loggedInUser);
        return Service.successResponse({}, 204);
    } catch (e) {
        return Service.errorResponse(e);
    }
};
