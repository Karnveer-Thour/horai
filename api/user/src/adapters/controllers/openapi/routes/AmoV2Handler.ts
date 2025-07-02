import { ServiceResponse, Service } from './Service';
import { SaveAmo } from '../../../../usecases/SaveAmo';
import { GetAmo } from '../../../../usecases/GetAmo';
import { UpdateAmoStatus } from '../../../../usecases/UpdateAmoStatus';
import { dateTimeRepository, amoRepository } from '../../../../infrastructures/config/IoC/inversify.config';
import { Components } from '../typings/schema';
import * as uuid from 'uuid';
import { SystemDateTimeRepository } from '../../../gateways/repositories/SystemDateTimeRepository';
import AmoBody = Components.Schemas.AmoBody;
import AmoStatusBody = Components.Schemas.AmoStatusBody;
import { GetAmos } from '../../../../usecases/GetAmos';
import { UpdateAmoById } from '../../../../usecases/UpdateAmoById';

export const createAmo = async (input: { authorization: string; amoBody: AmoBody }): Promise<ServiceResponse> => {
    try {
        const amoId = uuid.v4();
        const usecase = new SaveAmo(dateTimeRepository, amoRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        await usecase.execute({ amoId: amoId, name: input.amoBody.name, email: input.amoBody.email }, loggedInUser);

        return Service.successResponse({}, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};
export const getAmoByamoId = async (input: { amoId: string; authorization: string }): Promise<ServiceResponse> => {
    try {
        const usecase = new GetAmo(amoRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const response = await usecase.execute({ amoId: input.amoId }, loggedInUser);

        return Service.successResponse(response, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const getAllAmos = async (input: { authorization: string }): Promise<ServiceResponse> => {
    try {
        const usecase = new GetAmos(amoRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const res = await usecase.execute(loggedInUser);
        return Service.successResponse(res, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const updateAmobyAmoId = async (input: {
    amoId: string;
    authorization: string;
    amoBody: AmoBody;
}): Promise<ServiceResponse> => {
    try {
        const usecase = new UpdateAmoById(dateTimeRepository, amoRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        await usecase.execute(
            { amoId: input.amoId, name: input.amoBody.name, email: input.amoBody.email, isActive: true },
            loggedInUser,
        );

        return Service.successResponse({}, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const updateAmoStatus = async (input: {
    amoId: string;
    authorization: string;
    amoStatusBody: AmoStatusBody;
}): Promise<ServiceResponse> => {
    try {
        const usecase = new UpdateAmoStatus(dateTimeRepository, amoRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        await usecase.execute({ amoId: input.amoId, isActive: input.amoStatusBody.isActive }, loggedInUser);

        return Service.successResponse({}, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};
