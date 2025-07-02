import { Service, ServiceResponse } from './Service';
import { GetSmbs } from '../../../../usecases/internal/GetSmbs';
import { GetSmb } from '../../../../usecases/internal/GetSmb';
import { PostgresSmbRepository } from '../../../gateways/repositories/postgres/PostgresSmbRepository';
import { NotFoundError } from '../../../../usecases/errors/NotFoundError';

export const internalGetSmbs = async (input: {
    xsecretrequestkey: string;
    amoId: string;
}): Promise<ServiceResponse> => {
    try {
        await Service.verifyInternalHeader(input.xsecretrequestkey);
        const usecase = new GetSmbs(new PostgresSmbRepository());
        const result = await usecase.execute({ amoId: input.amoId });

        return Service.successResponse(result);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const internalGetSmbById = async (input: {
    xsecretrequestkey: string;
    smbId: string;
}): Promise<ServiceResponse> => {
    try {
        await Service.verifyInternalHeader(input.xsecretrequestkey);
        const usecase = new GetSmb(new PostgresSmbRepository());
        const res = await usecase.execute(input.smbId);
        return Service.successResponse(res);
    } catch (e) {
        if (e instanceof NotFoundError) {
            return Service.errorResponse(e, 404);
        }
        return Service.errorResponse(e);
    }
};
