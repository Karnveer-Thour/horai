import { Service } from './Service';
import { PostgresUserRepository } from '../../../gateways/repositories/postgres/PostgresUserRepository';
import { CheckHavePermissionDoAnAction } from '../../../../usecases/internal/authorization/CheckHavePermissionDoAnAction';
import { CasbinAuthorization } from '../../../../infrastructures/authorization/CasbinAuthorization';
import { authorizationConnectionHolder } from '../../../../infrastructures/config/IoC/inversify.config';
import { GetEventIds } from '../../../../usecases/internal/authorization/GetEventIds';

export const internalCheckUserPermission = async (input: {
    xsecretrequestkey: string;
    body: {
        resourceName: string;
        action: string;
        userEmail: string;
        id?: string;
    };
}) => {
    try {
        await Service.verifyInternalHeader(input.xsecretrequestkey);
        const usecase = new CheckHavePermissionDoAnAction(
            new CasbinAuthorization(authorizationConnectionHolder),
            new PostgresUserRepository(),
        );
        const result = await usecase.execute(
            input.body.userEmail,
            input.body.resourceName,
            input.body.action,
            input.body.id,
        );
        return Service.successResponse({ isAllowed: result }, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const internalGetAllowedEventIds = async (input: { xsecretrequestkey: string; userEmail: string }) => {
    try {
        await Service.verifyInternalHeader(input.xsecretrequestkey);
        const usecase = new GetEventIds(
            new CasbinAuthorization(authorizationConnectionHolder),
            new PostgresUserRepository(),
        );
        const result = await usecase.execute(input.userEmail);
        return Service.successResponse(result, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};
