import { LoggedInUser } from '../domains/LoggedInUser';
import { ApplicationCustomerRepository } from './repositories/ApplicationCustomerRepository';
import { CustomerRepository } from './repositories/CustomerRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';

import { UnauthorizedError } from './errors/UnauthorizedError';

import { CustomerType, GenderType, ServiceType, SocialAccount } from '../domains/customer/CustomerEnum';
import { NotFoundError } from './errors/NotFoundError';

export class UpdateCustomerById {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly customerRepository: CustomerRepository,
        readonly applicationCustomerRepository: ApplicationCustomerRepository,
    ) {}

    public execute = async (
        customerId: string,
        email: string,
        connectedFirebaseId: string,
        input: {
            firstName: string;
            socialAccount?: SocialAccount;
            lastName?: string;
            nickname?: string;
            gender?: string;
            dateOfBirth?: string;
            language?: string;
            customerType?: string;
            emailAddress?: string;
            phoneNumber?: string;
            postCode?: string;
            residenceArea?: string;
            acceptDirectMail?: boolean;
            username?: string;
            city?: string;
            province?: string;
            pronounceFirstName?: string;
            pronounceLastName?: string;
        },
        serviceType?: string,
        user?: LoggedInUser,
    ): Promise<void> => {
        if (!user) throw new UnauthorizedError();

        if (!user.isSv() && !user.isAmo() && !user.isSmb() && user.email !== email) {
            throw new UnauthorizedError();
        }

        const now = this.dateTimeRepository.now();
        let customer = await this.customerRepository.findById(customerId);
        if (!customer) throw new NotFoundError(`Customer not found for id ${customerId}`);

        if (
            input.socialAccount &&
            input.socialAccount !== SocialAccount.EMAIL &&
            customer.socialAccount !== SocialAccount.EMAIL
        ) {
            throw new UnauthorizedError(
                `Customer is already connected with other Social Account ${customerId} ${customer.socialAccount}`,
            );
        }

        customer = customer.update(
            {
                ...customer,
                socialAccount: input.socialAccount ? input.socialAccount : customer.socialAccount,
            },
            now,
        );
        await this.customerRepository.update(customer);

        /* Update Application Customer Details */
        if (!serviceType || serviceType === ServiceType.Application) {
            if (!customer.applicationCustomerDetail) {
                throw new NotFoundError(`Customer not found for service 'Application' with id ${customerId}`);
            }
            const applicationCustomerDetail = customer.applicationCustomerDetail;
            const applicationCustomerDetailUpdate = applicationCustomerDetail.update(
                {
                    firstName: input.firstName ? input.firstName : applicationCustomerDetail.firstName,
                    lastName: input.lastName ? input.lastName : applicationCustomerDetail.lastName,
                    nickname: input.nickname ? input.nickname : applicationCustomerDetail.nickname,
                    gender: input.gender ? (input.gender as GenderType) : applicationCustomerDetail.gender,
                    dateOfBirth: input.dateOfBirth ? input.dateOfBirth : applicationCustomerDetail.dateOfBirth,
                    language: input.language ? input.language : applicationCustomerDetail.language,
                    emailAddress: input.emailAddress ? input.emailAddress : applicationCustomerDetail.emailAddress,
                    phoneNumber: input.phoneNumber ? input.phoneNumber : applicationCustomerDetail.phoneNumber,
                    postCode: input.postCode ? input.postCode : applicationCustomerDetail.postCode,
                    residenceArea: input.residenceArea ? input.residenceArea : applicationCustomerDetail.residenceArea,
                    acceptDirectMail: input.acceptDirectMail
                        ? input.acceptDirectMail
                        : applicationCustomerDetail.acceptDirectMail,
                    customerType: input.customerType
                        ? (input.customerType as CustomerType)
                        : applicationCustomerDetail.customerType,
                    username: input.username ? input.username : applicationCustomerDetail.username,
                    city: input.city ? input.city : applicationCustomerDetail.city,
                    province: input.province ? input.province : applicationCustomerDetail.province,
                    pronounceFirstName: input.pronounceFirstName
                        ? input.pronounceFirstName
                        : applicationCustomerDetail.pronounceFirstName,
                    pronounceLastName: input.pronounceLastName
                        ? input.pronounceLastName
                        : applicationCustomerDetail.pronounceLastName,
                },
                now,
            );

            await this.applicationCustomerRepository.update(applicationCustomerDetailUpdate);
        }
    };
}
