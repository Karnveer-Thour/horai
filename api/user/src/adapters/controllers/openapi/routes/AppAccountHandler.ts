import { Service, ServiceResponse } from './Service';
import { SaveConnectedCustomerDetails } from '../../../../usecases/SaveConnectedCustomerDetails';
import { UnauthorizedError } from '../../../../usecases/errors/UnauthorizedError';
import { decryptBizToken } from '../../../../usecases/DecryptBizUserToken';
import { decryptConnectedCustomerToken } from '../../../../usecases/DecrypUserToken';
import { AppTypeConstants } from '../../../../domains/AppTypeEnum';

import {
    applicationCustomerRepository,
    connectedCustomerRepository,
    customerRepository,
    dateTimeRepository,
} from '../../../../infrastructures/config/IoC/inversify.config';
import { NotFoundError } from '../../../../usecases/errors/NotFoundError';
import { UnlinkConnectedCustomerDetails } from '../../../../usecases/UnlinkConnectedCustomerDetails';

export const accountLinking = async (input: {
    horai_authorization_token: string;
    appAccount_authorization_token: string;
    appType: string;
}): Promise<ServiceResponse> => {
    try {
        const loggedInUser = await Service.loggedInUser(input.horai_authorization_token);
        if (!loggedInUser) throw new UnauthorizedError();
        let decryptToken;

        if (input.appType === AppTypeConstants.NBIZ) {
            decryptToken = await decryptBizToken(input.appAccount_authorization_token);
        } else {
            decryptToken = await decryptConnectedCustomerToken(input.appAccount_authorization_token);
        }

        const usecase = new SaveConnectedCustomerDetails(
            dateTimeRepository,
            customerRepository,
            connectedCustomerRepository,
        );
        const connectedCustomerDetails = await usecase.execute(
            decryptToken?.data?.decodedPayload || '',
            input.appType,
            loggedInUser,
        );
        return Service.successResponse({ connectedCustomerDetails }, 200);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const accountUnlink = async (input: { authorization: string; appType: string }): Promise<ServiceResponse> => {
    try {
        const loggedInUser = await Service.loggedInUser(input.authorization);
        if (!loggedInUser) throw new UnauthorizedError();
        const usecase = new UnlinkConnectedCustomerDetails(
            dateTimeRepository,
            customerRepository,
            connectedCustomerRepository,
        );
        await usecase.execute(loggedInUser, input.appType);
        return Service.successResponse({ message: 'Customer connection unlinked successfully' }, 200);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};
