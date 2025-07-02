import { ServiceResponse, Service } from './Service';
import { SaveAmo, GetAmo, GetAmos } from '../../../../usecases/Amo';
import { Components } from '../typings/schema';
import { SystemDateTimeRepository } from '../../../gateways/repositories/SystemDateTimeRepository';
import AmoBody = Components.Schemas.AmoBody;

import { PostgresAmoRepository } from '../../../gateways/repositories/postgres/PostgresAmoRepository';

export const amosAmoIdPUT = async (input: {
    amoId: string;
    authorization: string;
    amoBody: AmoBody;
}): Promise<ServiceResponse> => {
    try {
        const usecase = new SaveAmo(new SystemDateTimeRepository(), new PostgresAmoRepository());
        const loggedInUser = await Service.loggedInUser(input.authorization);
        await usecase.execute(
            { amoId: input.amoId, name: input.amoBody.name, email: input.amoBody.email, isActive: true },
            loggedInUser,
        );

        return Service.successResponse({}, 204);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const getAmoById = async (input: { amoId: string; authorization: string }): Promise<ServiceResponse> => {
    try {
        const usecase = new GetAmo(new SystemDateTimeRepository(), new PostgresAmoRepository());
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const response = await usecase.execute({ amoId: input.amoId }, loggedInUser);

        return Service.successResponse(response, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const amosGET = async (input: { amoId: string; authorization: string }): Promise<ServiceResponse> => {
    try {
        const usecase = new GetAmos(new PostgresAmoRepository());
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const res = await usecase.execute(loggedInUser);
        return Service.successResponse(res);
    } catch (e) {
        return Service.errorResponse(e);
    }
};
