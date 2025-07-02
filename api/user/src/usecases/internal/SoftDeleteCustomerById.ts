import { CustomerRepository } from '../repositories/CustomerRepository';
import { DateTimeRepository } from '../repositories/DateTimeRepository';
import { ReservationCustomerRepository } from '../repositories/ReservationCustomerRepository';

import { ServiceType } from '../../domains/customer/CustomerEnum';
import { NotFoundError } from '../errors/NotFoundError';

export class SoftDeleteCustomerById {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly customerRepository: CustomerRepository,
        readonly reservationCustomerRepository: ReservationCustomerRepository,
    ) {}

    public execute = async (customerId: string, serviceType?: string): Promise<void> => {
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

            await this.reservationCustomerRepository.softDeleteById(
                customer.reservationCustomerDetail.reservationCustomerDetailId,
                now,
            );
        }
    };
}
