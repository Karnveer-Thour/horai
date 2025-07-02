import { DateTimeRepository } from '../repositories/DateTimeRepository';
import { ReservationCustomerRepository } from '../repositories/ReservationCustomerRepository';

import { CustomerRepository } from '../repositories/CustomerRepository';

import { GenderType, ServiceType } from '../../domains/customer/CustomerEnum';
import { NotFoundError } from '../errors/NotFoundError';

export class UpdateCustomerById {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly customerRepository: CustomerRepository,
        readonly reservationCustomerRepository: ReservationCustomerRepository,
    ) {}

    public execute = async (
        customerId: string,
        input: {
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
            username?: string;
            city?: string;
            province?: string;
            pronounceFirstName?: string;
            pronounceLastName?: string;
        },
        serviceType?: string,
    ): Promise<void> => {
        const now = this.dateTimeRepository.now();
        const customer = await this.customerRepository.findById(customerId);
        if (!customer) {
            throw new NotFoundError(`Customer not found for id ${customerId}`);
        }

        /* Update Reservation Customer Details */
        if (serviceType === ServiceType.Reservation) {
            if (!customer.reservationCustomerDetail) {
                throw new NotFoundError(`Customer not found for service 'Reservation' with id ${customerId}`);
            }
            const reservationCustomerDetail = customer.reservationCustomerDetail;
            const reservationCustomerDetailUpdate = reservationCustomerDetail.update(
                {
                    firstName: input.firstName ? input.firstName : reservationCustomerDetail.firstName,
                    lastName: input.lastName ? input.lastName : reservationCustomerDetail.lastName,
                    nickname: input.nickname ? input.nickname : reservationCustomerDetail.nickname,
                    gender: input.gender ? (input.gender as GenderType) : reservationCustomerDetail.gender,
                    dateOfBirth: input.dateOfBirth ? input.dateOfBirth : reservationCustomerDetail.dateOfBirth,
                    language: input.language ? input.language : reservationCustomerDetail.language,
                    emailAddress: input.emailAddress ? input.emailAddress : reservationCustomerDetail.emailAddress,
                    phoneNumber: input.phoneNumber ? input.phoneNumber : reservationCustomerDetail.phoneNumber,
                    postCode: input.postCode ? input.postCode : reservationCustomerDetail.postCode,
                    residenceArea: input.residenceArea ? input.residenceArea : reservationCustomerDetail.residenceArea,
                    acceptDirectMail: input.acceptDirectMail
                        ? input.acceptDirectMail
                        : reservationCustomerDetail.acceptDirectMail,
                    pronounceFirstName: input.pronounceFirstName
                        ? input.pronounceFirstName
                        : reservationCustomerDetail.pronounceFirstName,
                    pronounceLastName: input.pronounceLastName
                        ? input.pronounceLastName
                        : reservationCustomerDetail.pronounceLastName,
                    isActive: true,
                    isDeleted: false,
                },
                now,
            );

            await this.reservationCustomerRepository.update(reservationCustomerDetailUpdate);
        }
    };
}
