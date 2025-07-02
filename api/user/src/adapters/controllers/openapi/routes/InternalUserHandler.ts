import { Service } from './Service';
import {
    customerRepository,
    reservationCustomerRepository,
    applicationCustomerRepository,
    userDeviceTokenRepository,
} from '../../../../infrastructures/config/IoC/inversify.config';
import { PostgresUserRepository } from '../../../gateways/repositories/postgres/PostgresUserRepository';
import { GetUser } from '../../../../usecases/internal/GetUser';
import { GetUserDeviceToken } from '../../../../usecases/internal/GetUserDeviceToken';
import { GetAllDxCoreUserDeviceToken } from '../../../../usecases/internal/GetAllDxCoreUserDeviceToken';
import { ServiceType } from '../../../../domains/customer/CustomerEnum';

export const internalGetUserService = async (input: { xsecretrequestkey: string; email: string }) => {
    try {
        await Service.verifyInternalHeader(input.xsecretrequestkey);
        const usecase = new GetUser(new PostgresUserRepository());
        const user = await usecase.execute(input.email);
        return Service.successResponse(user, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const internalGetUserDeviceTokenService = async (input: {
    xsecretrequestkey: string;
    email: string;
    serviceType: string;
}) => {
    try {
        await Service.verifyInternalHeader(input.xsecretrequestkey);
        const usecase = new GetUserDeviceToken(
            new PostgresUserRepository(),
            customerRepository,
            reservationCustomerRepository,
            applicationCustomerRepository,
            userDeviceTokenRepository,
        );
        const res = await usecase.execute(input.email, input.serviceType);
        return Service.successResponse(res, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const internalGetAllDxCoreUserDeviceTokenService = async (input: {
    xsecretrequestkey: string;
    email: string;
    serviceType: ServiceType;
}) => {
    try {
        await Service.verifyInternalHeader(input.xsecretrequestkey);
        const usecase = new GetAllDxCoreUserDeviceToken(customerRepository, userDeviceTokenRepository);
        const res = await usecase.execute(input.serviceType);
        return Service.successResponse(res, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};
