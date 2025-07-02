import {
    applicationCustomerRepository,
    customerRepository,
    dateTimeRepository,
    emailSender,
    firebaseRepository,
} from '../../../../infrastructures/config/IoC/inversify.config';
import { GenerateOtp } from '../../../../usecases/Auth/GenerateOtp';
import { VerifyOtpAndCreateGuestCustomer } from '../../../../usecases/Auth/VerifyOtpAndCreateGuestCustomer';
import { NotFoundError } from '../../../../usecases/errors/NotFoundError';
import { Components } from '../typings/schema';
import { FirebaseService, Service, ServiceResponse } from './Service';
import GenerateOtpBody = Components.Schemas.GenerateOtpBody;
import VerifyOtpBody = Components.Schemas.VerifyOtpBody;

export const generateOtp = async (input: { generateOtpBody: GenerateOtpBody }): Promise<ServiceResponse> => {
    try {
        const featureFlag = await FirebaseService.checkFeatureFlag('new_feature_customer_flag');

        if (!featureFlag.isAvailable || (featureFlag.isAvailable && featureFlag.value === 'false')) {
            throw new NotFoundError('This feature is not available for you at the moment');
        }

        const usecase = new GenerateOtp(emailSender);

        const res = await usecase.execute(input.generateOtpBody.email);

        return Service.successResponse(
            {
                hash: res,
                message: 'ワンタイムパスワードが送信されました。',
            },
            200,
        );
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const verifyOtpAndCreateGuestCustomer = async (input: {
    verifyOtpBody: VerifyOtpBody;
}): Promise<ServiceResponse> => {
    try {
        const featureFlag = await FirebaseService.checkFeatureFlag('new_feature_customer_flag');

        if (!featureFlag.isAvailable || (featureFlag.isAvailable && featureFlag.value === 'false')) {
            throw new NotFoundError('This feature is not available for you at the moment');
        }

        const usecase = new VerifyOtpAndCreateGuestCustomer(
            customerRepository,
            applicationCustomerRepository,
            dateTimeRepository,
            firebaseRepository,
            emailSender,
        );
        const res = await usecase.execute({
            email: input.verifyOtpBody.email.toLowerCase(),
            otp: input.verifyOtpBody.otp,
            hash: input.verifyOtpBody.hash,

            firstName: input.verifyOtpBody.firstName,
            lastName: input.verifyOtpBody.lastName,
            password: input.verifyOtpBody.password,
            nickname: input.verifyOtpBody.nickname || '',
            gender: input.verifyOtpBody.gender,
            dateOfBirth: input.verifyOtpBody.dateOfBirth,
            language: input.verifyOtpBody.language,
            customerType: input.verifyOtpBody.customerType,
            emailAddress: (input.verifyOtpBody.emailAddress || '').toLowerCase(),
            phoneNumber: input.verifyOtpBody.phoneNumber,
            postCode: input.verifyOtpBody.postCode,
            residenceArea: input.verifyOtpBody.residenceArea,
            acceptDirectMail: input.verifyOtpBody.acceptDirectMail || false,
            pronounceFirstName: input.verifyOtpBody.pronounceFirstName,
            pronounceLastName: input.verifyOtpBody.pronounceLastName,
        });

        return Service.successResponse(
            {
                customer: res,
                message: 'ワンタイムパスワードの認証が完了しました。',
            },
            200,
        );
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};
