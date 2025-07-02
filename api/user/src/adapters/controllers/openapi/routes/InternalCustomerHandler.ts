import {
    applicationCustomerRepository,
    customerRepository,
    dateTimeRepository,
    reservationCustomerRepository,
    stripeCustomerRepository,
} from '../../../../infrastructures/config/IoC/inversify.config';
import { NotFoundError } from '../../../../usecases/errors/NotFoundError';
import { CreateCustomer } from '../../../../usecases/internal/CreateCustomer';
import { GetCustomerById } from '../../../../usecases/internal/GetCustomerById';
import { GetCustomers } from '../../../../usecases/internal/GetCustomers';
import { SoftDeleteCustomerById } from '../../../../usecases/internal/SoftDeleteCustomerById';
import { UpdateCustomerById } from '../../../../usecases/internal/UpdateCustomerById';
import { Components } from '../typings/schema';
import { FirebaseService, Service, ServiceResponse } from './Service';
import CustomerBody = Components.Schemas.Customer;
import InternalGetCustomersBody = Components.Schemas.InternalGetCustomersBody;

export const createInternalCustomer = async (input: {
    xsecretrequestkey: string;
    customerBody: CustomerBody;
}): Promise<ServiceResponse> => {
    try {
        const featureFlag = await FirebaseService.checkFeatureFlag('new_feature_customer_flag');

        if (!featureFlag.isAvailable || (featureFlag.isAvailable && featureFlag.value === 'false')) {
            throw new NotFoundError('This feature is not available for you at the moment');
        }

        await Service.verifyInternalHeader(input.xsecretrequestkey);
        const usecase = new CreateCustomer(
            dateTimeRepository,
            customerRepository,
            reservationCustomerRepository,
            applicationCustomerRepository,
            stripeCustomerRepository,
        );
        await usecase.execute({
            email: input.customerBody.email.toLowerCase(),
            connectedFirebaseId: input.customerBody.connectedFirebaseId || '',
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
            customerId: input.customerBody.customerId,
            username: input.customerBody.username,
            city: input.customerBody.city,
            province: input.customerBody.province,
            pronounceFirstName: input.customerBody.pronounceFirstName,
            pronounceLastName: input.customerBody.pronounceLastName,
        });

        return Service.successResponse({}, 204);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const getInternalCustomer = async (input: {
    xsecretrequestkey: string;
    internalGetCustomersBody: InternalGetCustomersBody;
}): Promise<ServiceResponse> => {
    try {
        const featureFlag = await FirebaseService.checkFeatureFlag('new_feature_customer_flag');

        if (!featureFlag.isAvailable || (featureFlag.isAvailable && featureFlag.value === 'false')) {
            throw new NotFoundError('This feature is not available for you at the moment');
        }

        await Service.verifyInternalHeader(input.xsecretrequestkey);
        const usecase = new GetCustomers(customerRepository);

        const res = await usecase.execute(input.internalGetCustomersBody.customerIds);

        return Service.successResponse(res, 200);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const updateInternalCustomerById = async (input: {
    xsecretrequestkey: string;
    customerId: string;
    customerBody: CustomerBody;
}): Promise<ServiceResponse> => {
    try {
        const featureFlag = await FirebaseService.checkFeatureFlag('new_feature_customer_flag');

        if (!featureFlag.isAvailable || (featureFlag.isAvailable && featureFlag.value === 'false')) {
            throw new NotFoundError('This feature is not available for you at the moment');
        }

        await Service.verifyInternalHeader(input.xsecretrequestkey);

        const usecase = new UpdateCustomerById(dateTimeRepository, customerRepository, reservationCustomerRepository);
        await usecase.execute(
            input.customerId,
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
            },
            input.customerBody.serviceType,
        );
        return Service.successResponse({}, 204);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const getInternalCustomerById = async (input: {
    customerId: string;
    xsecretrequestkey: string;
    serviceType?: string;
}): Promise<ServiceResponse> => {
    try {
        const featureFlag = await FirebaseService.checkFeatureFlag('new_feature_customer_flag');

        if (!featureFlag.isAvailable || (featureFlag.isAvailable && featureFlag.value === 'false')) {
            throw new NotFoundError('This feature is not available for you at the moment');
        }
        await Service.verifyInternalHeader(input.xsecretrequestkey);

        const usecase = new GetCustomerById(customerRepository);
        const res = await usecase.execute(input.customerId, input.serviceType);
        return Service.successResponse(res, 200);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const softDeleteInternalCustomerById = async (input: {
    xsecretrequestkey: string;
    customerId: string;
    serviceType: string;
}): Promise<ServiceResponse> => {
    try {
        const featureFlag = await FirebaseService.checkFeatureFlag('new_feature_customer_flag');

        if (!featureFlag.isAvailable || (featureFlag.isAvailable && featureFlag.value === 'false')) {
            throw new NotFoundError('This feature is not available for you at the moment');
        }

        await Service.verifyInternalHeader(input.xsecretrequestkey);

        const usecase = new SoftDeleteCustomerById(
            dateTimeRepository,
            customerRepository,
            reservationCustomerRepository,
        );
        await usecase.execute(input.customerId, input.serviceType);
        return Service.successResponse({}, 204);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};
