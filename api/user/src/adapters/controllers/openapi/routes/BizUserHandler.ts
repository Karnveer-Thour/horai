import { Service, ServiceResponse } from './Service';
import { SaveBizUser } from '../../../../usecases/SaveBizUserDetails';
import { UnauthorizedError } from '../../../../usecases/errors/UnauthorizedError';
import { decryptBizToken } from '../../../../usecases/DecryptBizUserToken';
import {
    applicationCustomerRepository,
    customerRepository,
    dateTimeRepository,
} from '../../../../infrastructures/config/IoC/inversify.config';
import { UnlinkBizDetail } from '../../../../usecases/UnlinkBizDetails';
export const bizUserCommunication = async (input: {
    horai_authorization_token: string;
    biz_authorization_token: string;
}): Promise<ServiceResponse> => {
    try {
        const loggedInUser = await Service.loggedInUser(input.horai_authorization_token);
        if (!loggedInUser) throw new UnauthorizedError();
        console.log('[gcp logs]: loggedInUser', loggedInUser);
        const decryptToken = await decryptBizToken(input.biz_authorization_token);
        console.log('[gcp logs]: decryptToken', decryptToken);
        const usecase = new SaveBizUser(dateTimeRepository, customerRepository, applicationCustomerRepository);
        await usecase.execute(decryptToken.data?.decodedPayload || '', loggedInUser);
        return Service.successResponse({}, 204);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};
export const unlinkBizUserConnection = async (input: { authorization: string }): Promise<ServiceResponse> => {
    try {
        const loggedInUser = await Service.loggedInUser(input.authorization);
        if (!loggedInUser) throw new UnauthorizedError();
        const usecase = new UnlinkBizDetail(dateTimeRepository, customerRepository, applicationCustomerRepository);
        await usecase.execute(loggedInUser);
        return Service.successResponse({}, 204);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};
