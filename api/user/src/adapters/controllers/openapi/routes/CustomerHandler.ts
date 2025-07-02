import { CreateCustomer } from '../../../../usecases/CreateCustomer';
import { GetAllCustomersWithPagination } from '../../../../usecases/GetAllCustomersWithPagination';
import { GetCustomerById } from '../../../../usecases/GetCustomerById';
import { SoftDeleteCustomerById } from '../../../../usecases/SoftDeleteCustomerById';
import { UpdateCustomerById } from '../../../../usecases/UpdateCustomerById';
import { Components } from '../typings/schema';
import { FirebaseService, Service, ServiceResponse } from './Service';
import CustomerBody = Components.Schemas.Customer;

import { SocialAccount } from '../../../../domains/customer/CustomerEnum';
import {
    applicationCustomerRepository,
    customerRepository,
    dateTimeRepository,
    firebaseRepository,
    stripeCustomerRepository,
} from '../../../../infrastructures/config/IoC/inversify.config';
import { DeleteCustomerById } from '../../../../usecases/DeleteCustomerById';
import { NotFoundError } from '../../../../usecases/errors/NotFoundError';
import { UnauthorizedError } from '../../../../usecases/errors/UnauthorizedError';

export const createCustomer = async (input: {
    authorization: string;
    customerBody: CustomerBody;
}): Promise<ServiceResponse> => {
    try {
        const featureFlag = await FirebaseService.checkFeatureFlag('new_feature_customer_flag');

        if (!featureFlag.isAvailable || (featureFlag.isAvailable && featureFlag.value === 'false')) {
            throw new NotFoundError('This feature is not available for you at the moment');
        }

        const loggedInUser = await Service.loggedInUser(input.authorization);
        if (!loggedInUser) throw new UnauthorizedError();

        const usecase = new CreateCustomer(
            dateTimeRepository,
            customerRepository,
            applicationCustomerRepository,
            stripeCustomerRepository,
        );
        const res = await usecase.execute(
            {
                email: input.customerBody.email.toLowerCase(),
                connectedFirebaseId: input.customerBody.connectedFirebaseId ?? loggedInUser.id,
                firstName: input.customerBody.firstName,
                lastName: input.customerBody.lastName || '',
                nickname: input.customerBody.nickname || '',
                gender: input.customerBody.gender,
                dateOfBirth: input.customerBody.dateOfBirth,
                language: input.customerBody.language,
                customerType: input.customerBody.customerType,
                emailAddress: (input.customerBody.emailAddress || '').toLowerCase(),
                phoneNumber: input.customerBody.phoneNumber,
                postCode: input.customerBody.postCode,
                residenceArea: input.customerBody.residenceArea,
                acceptDirectMail: input.customerBody.acceptDirectMail || false,
                serviceType: input.customerBody.serviceType,
                username: input.customerBody.username,
                city: input.customerBody.city,
                province: input.customerBody.province,
                pronounceFirstName: input.customerBody.pronounceFirstName,
                pronounceLastName: input.customerBody.pronounceLastName,
                socialAccount: input.customerBody.socialAccount
                    ? (input.customerBody.socialAccount as SocialAccount)
                    : SocialAccount.EMAIL,
            },
            loggedInUser,
        );
        return Service.successResponse(res, 200);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const updateCustomerById = async (input: {
    authorization: string;
    customerId: string;
    customerBody: CustomerBody;
}): Promise<ServiceResponse> => {
    try {
        const featureFlag = await FirebaseService.checkFeatureFlag('new_feature_customer_flag');

        if (!featureFlag.isAvailable || (featureFlag.isAvailable && featureFlag.value === 'false')) {
            throw new NotFoundError('This feature is not available for you at the moment');
        }

        const loggedInUser = await Service.loggedInUser(input.authorization);
        const usecase = new UpdateCustomerById(dateTimeRepository, customerRepository, applicationCustomerRepository);
        await usecase.execute(
            input.customerId,
            input.customerBody.email.toLowerCase(),
            input.customerBody.connectedFirebaseId || (loggedInUser ? loggedInUser.id : ''),
            {
                firstName: input.customerBody.firstName,
                lastName: input.customerBody.lastName,
                nickname: input.customerBody.nickname,
                gender: input.customerBody.gender,
                dateOfBirth: input.customerBody.dateOfBirth,
                language: input.customerBody.language,
                customerType: input.customerBody.customerType,
                emailAddress: input.customerBody.emailAddress
                    ? input.customerBody.emailAddress.toLowerCase()
                    : undefined,
                phoneNumber: input.customerBody.phoneNumber,
                postCode: input.customerBody.postCode,
                residenceArea: input.customerBody.residenceArea,
                acceptDirectMail: input.customerBody.acceptDirectMail || false,
                username: input.customerBody.username,
                city: input.customerBody.city,
                province: input.customerBody.province,
                pronounceFirstName: input.customerBody.pronounceFirstName,
                pronounceLastName: input.customerBody.pronounceLastName,
                socialAccount: input.customerBody.socialAccount as SocialAccount,
            },
            input.customerBody.serviceType,
            loggedInUser,
        );
        return Service.successResponse({}, 204);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const getCustomerById = async (input: {
    authorization: string;
    customerId: string;
    socialAccount: string;
}): Promise<ServiceResponse> => {
    try {
        const featureFlag = await FirebaseService.checkFeatureFlag('new_feature_customer_flag');

        if (!featureFlag.isAvailable || (featureFlag.isAvailable && featureFlag.value === 'false')) {
            throw new NotFoundError('This feature is not available for you at the moment');
        }

        const loggedInUser = await Service.loggedInUser(input.authorization);
        const usecase = new GetCustomerById(customerRepository);
        const res = await usecase.execute(
            input.customerId,
            undefined,
            input.socialAccount ? (input.socialAccount as SocialAccount) : SocialAccount.EMAIL,
            loggedInUser,
        );
        return Service.successResponse(res, 200);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const getAllCustomersWithPagination = async (input: {
    authorization: string;
    page: number;
    limit: number;
    searchText: string;
    serviceType: string;
}): Promise<ServiceResponse> => {
    try {
        const featureFlag = await FirebaseService.checkFeatureFlag('new_feature_customer_flag');

        if (!featureFlag.isAvailable || (featureFlag.isAvailable && featureFlag.value === 'false')) {
            throw new NotFoundError('This feature is not available for you at the moment');
        }

        const loggedInUser = await Service.loggedInUser(input.authorization);
        const usecase = new GetAllCustomersWithPagination(customerRepository);
        const res = await usecase.execute(input.page, input.limit, input.searchText, input.serviceType, loggedInUser);
        return Service.successResponse(res, 200);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const softDeleteCustomerById = async (input: {
    authorization: string;
    customerId: string;
    serviceType: string;
}): Promise<ServiceResponse> => {
    try {
        const featureFlag = await FirebaseService.checkFeatureFlag('new_feature_customer_flag');

        if (!featureFlag.isAvailable || (featureFlag.isAvailable && featureFlag.value === 'false')) {
            throw new NotFoundError('This feature is not available for you at the moment');
        }

        const loggedInUser = await Service.loggedInUser(input.authorization);
        const usecase = new SoftDeleteCustomerById(
            dateTimeRepository,
            customerRepository,
            applicationCustomerRepository,
        );
        await usecase.execute(input.customerId, input.serviceType, loggedInUser);
        return Service.successResponse({}, 204);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const deleteCustomerById = async (input: {
    authorization: string;
    customerId: string;
    serviceType: string;
}): Promise<ServiceResponse> => {
    try {
        const featureFlag = await FirebaseService.checkFeatureFlag('new_feature_customer_flag');

        if (!featureFlag.isAvailable || (featureFlag.isAvailable && featureFlag.value === 'false')) {
            throw new NotFoundError('This feature is not available for you at the moment');
        }

        const loggedInUser = await Service.loggedInUser(input.authorization);
        const usecase = new DeleteCustomerById(
            dateTimeRepository,
            customerRepository,
            applicationCustomerRepository,
            firebaseRepository,
            stripeCustomerRepository,
        );

        await usecase.execute(input.customerId, input.serviceType, loggedInUser);

        return Service.successResponse({}, 204);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};
