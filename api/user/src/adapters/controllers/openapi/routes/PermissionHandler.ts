import { Service } from './Service';
import { PostgresUserRepository } from '../../../gateways/repositories/postgres/PostgresUserRepository';
import { CheckHavePermissionDoAnAction } from '../../../../usecases/internal/authorization/CheckHavePermissionDoAnAction';
import { CasbinAuthorization } from '../../../../infrastructures/authorization/CasbinAuthorization';
import {
    authorizationConnectionHolder,
    dateTimeRepository,
    smbRepository,
} from '../../../../infrastructures/config/IoC/inversify.config';
import { GetEventIds } from '../../../../usecases/internal/authorization/GetEventIds';
import { DeactivateSmb } from '../../../../usecases/DeactivateSmb';
import { CreatePermission } from '../../../../usecases/authorization/CreatePermission';
import { UpdatePermission } from '../../../../usecases/authorization/UpdatePermission';
import { HardDeletePermission } from '../../../../usecases/authorization/HardDeletePermission';

export const createPermission = async (input: {
    authorization: string;
    body: {
        permissions: {
            subject: string;
            resource: string;
            action: string;
        }[];
    };
}) => {
    try {
        const usecase = new CreatePermission(
            new CasbinAuthorization(authorizationConnectionHolder),
            new PostgresUserRepository(),
        );
        const loggedInUser = await Service.loggedInUser(input.authorization);
        await usecase.execute(input.body.permissions, loggedInUser);

        return Service.successResponse({}, 204);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const updatePermission = async (input: {
    authorization: string;
    subject: string;
    resource: string;
    action: string;
    body: {
        subject: string;
        resource: string;
        action: string;
    };
}) => {
    try {
        const usecase = new UpdatePermission(
            new CasbinAuthorization(authorizationConnectionHolder),
            new PostgresUserRepository(),
        );
        const loggedInUser = await Service.loggedInUser(input.authorization);
        await usecase.execute(
            {
                subject: input.subject,
                resource: input.resource,
                action: input.action,
            },
            {
                subject: input.body.subject,
                resource: input.body.resource,
                action: input.body.action,
            },
            loggedInUser,
        );

        return Service.successResponse({}, 204);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const deletePermission = async (input: {
    authorization: string;
    subject: string;
    resource: string;
    action: string;
}) => {
    try {
        const usecase = new HardDeletePermission(
            new CasbinAuthorization(authorizationConnectionHolder),
            new PostgresUserRepository(),
        );
        const loggedInUser = await Service.loggedInUser(input.authorization);
        await usecase.execute(
            {
                subject: input.subject,
                resource: input.resource,
                action: input.action,
            },
            loggedInUser,
        );

        return Service.successResponse({}, 204);
    } catch (e) {
        return Service.errorResponse(e);
    }
};
