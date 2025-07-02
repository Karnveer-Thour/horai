import { ApplicationCustomerDetail } from '../domains/customer/ApplicationCustomerDetail';
import { Customer } from '../domains/customer/Customer';
import { LoggedInUser } from '../domains/LoggedInUser';
import { ApplicationCustomerRepository } from './repositories/ApplicationCustomerRepository';
import { CustomerRepository } from './repositories/CustomerRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';

import { UnauthorizedError } from './errors/UnauthorizedError';

import * as uuid from 'uuid';
import { CustomerType, GenderType, ServiceType, SocialAccount } from '../domains/customer/CustomerEnum';
import { ApplicationCustomerDTO } from '../domains/dtos/ApplicationCustomerDetailDTO';
import { IllegalStateError } from './errors/IllegalStateError';
import { StripeCustomerRepository } from './repositories/StripeCustomerRepository';

type CreateCustomerBody = {
    email: string;
    connectedFirebaseId: string;
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
    serviceType?: string;
    username?: string;
    city?: string;
    province?: string;
    pronounceFirstName?: string;
    pronounceLastName?: string;
};

export class CreateCustomer {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly customerRepository: CustomerRepository,
        readonly applicationCustomerRepository: ApplicationCustomerRepository,
        readonly stripeCustomerRepository: StripeCustomerRepository,
    ) {}

    public execute = async (input: CreateCustomerBody, user: LoggedInUser): Promise<ApplicationCustomerDTO> => {
        const { email, socialAccount, connectedFirebaseId: firebaseId, serviceType } = input;
        if (!user.isAmo() && !user.isSv() && !user.isSmb() && user.email !== email) {
            throw new UnauthorizedError();
        }

        const now = this.dateTimeRepository.now();
        const existingCustomer = await this.customerRepository.findByEmail(firebaseId);
        if (existingCustomer) throw new IllegalStateError(`Customer with email ${email}, already exists.`);

        // CREATE Customer
        const customerId = uuid.v4();
        const customer = Customer.create(
            customerId,
            email,
            firebaseId,
            { socialAccount: socialAccount as SocialAccount },
            now,
        );

        // CREATE Customer & Stripe Customer
        await this.customerRepository.create(customer);
        await this.stripeCustomerRepository.createStripeCustomer(input.connectedFirebaseId, input.email);

        // CREATE Application Customer Details
        const isCustomerRegisteredFromApp = !serviceType || serviceType === ServiceType.Application;
        if (isCustomerRegisteredFromApp) {
            const applicationCustomerDetailId = uuid.v4();
            const applicationCustomerDetail = ApplicationCustomerDetail.create(
                applicationCustomerDetailId,
                customer.customerId,
                {
                    ...input,
                    emailAddress: input.emailAddress ?? email,
                    gender: (input.gender as GenderType) ?? undefined,
                    customerType: (input.customerType as CustomerType) || CustomerType.REGULAR,
                },
                now,
            );

            await this.applicationCustomerRepository.create(applicationCustomerDetail);
        }

        return customer.toApplicationCustomerDTO();
    };
}
