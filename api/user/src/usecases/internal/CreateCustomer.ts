import { Customer } from '../../domains/customer/Customer';
import { ApplicationCustomerRepository } from '../repositories/ApplicationCustomerRepository';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { DateTimeRepository } from '../repositories/DateTimeRepository';
import { ReservationCustomerRepository } from '../repositories/ReservationCustomerRepository';

import * as uuid from 'uuid';
import { ApplicationCustomerDetail } from '../../domains/customer/ApplicationCustomerDetail';
import { CustomerType, GenderType, ServiceType, SocialAccount } from '../../domains/customer/CustomerEnum';
import { ReservationCustomerDetail } from '../../domains/customer/ReservationCustomerDetail';
import { StripeCustomerRepository } from '../repositories/StripeCustomerRepository';

export class CreateCustomer {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly customerRepository: CustomerRepository,
        readonly reservationCustomerRepository: ReservationCustomerRepository,
        readonly applicationCustomerRepository: ApplicationCustomerRepository,
        readonly stripeCustomerRepository: StripeCustomerRepository,
    ) {}

    public execute = async (input: {
        customerId?: string;
        email: string;
        connectedFirebaseId: string;
        firstName: string;
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
        city?: string;
        province?: string;
        username?: string;
        pronounceFirstName?: string;
        pronounceLastName?: string;
    }): Promise<string> => {
        const now = this.dateTimeRepository.now();
        const existingCustomer = await this.customerRepository.findByEmail(input.email);
        const customerId = existingCustomer
            ? existingCustomer.customerId
            : input.customerId
            ? input.customerId
            : uuid.v4();
        if (!existingCustomer) {
            /* CREATE Customer */
            const customer = Customer.create(
                customerId,
                input.email,
                input.connectedFirebaseId,
                {
                    socialAccount: SocialAccount.EMAIL,
                },
                now,
            );
            await this.customerRepository.create(customer);
        }

        /* CREATE Reservation Customer Details */
        if (input.serviceType === ServiceType.Reservation && !existingCustomer?.reservationCustomerDetail) {
            const reservationCustomerDetail = ReservationCustomerDetail.create(
                uuid.v4(),
                customerId,
                {
                    firstName: input.firstName,
                    lastName: input.lastName,
                    nickname: input.nickname,
                    dateOfBirth: input.dateOfBirth,
                    postCode: input.postCode,
                    gender: input.gender ? (input.gender as GenderType) : undefined,
                    residenceArea: input.residenceArea,
                    acceptDirectMail: input.acceptDirectMail,
                    emailAddress: input.emailAddress || '',
                    language: input.language,
                    phoneNumber: input.phoneNumber,
                    isActive: true,
                    isDeleted: false,
                    pronounceFirstName: input.pronounceFirstName,
                    pronounceLastName: input.pronounceLastName,
                },
                now,
                (input.customerType as CustomerType) || CustomerType.REGULAR,
            );
            await this.reservationCustomerRepository.create(reservationCustomerDetail);
        }

        /* CREATE Application Customer Details */
        if (input.serviceType === ServiceType.Application && !existingCustomer?.applicationCustomerDetail) {
            const applicationCustomerDetail = ApplicationCustomerDetail.create(
                uuid.v4(),
                customerId,
                {
                    ...input,
                    emailAddress: input.emailAddress || '',
                    gender: input.gender ? (input.gender as GenderType) : undefined,
                    customerType: (input.customerType as CustomerType) || CustomerType.REGULAR,
                },
                now,
            );
            await this.applicationCustomerRepository.create(applicationCustomerDetail);
        }

        await this.stripeCustomerRepository.createStripeCustomer(input.connectedFirebaseId, input.email);

        return customerId;
    };
}
