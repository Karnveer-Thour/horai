import { CustomerRepository } from '../repositories/CustomerRepository';

import { Customer } from '../../domains/customer/Customer';
import { ServiceType } from '../../domains/customer/CustomerEnum';
import { ApplicationCustomerDTO } from '../../domains/dtos/ApplicationCustomerDetailDTO';
import { NotFoundError } from '../errors/NotFoundError';
import { validateEmailFormat } from '../utils/EmailFormatValidator';

export class GetCustomerById {
    constructor(readonly customerRepository: CustomerRepository) {}

    public execute = async (customerId: string, serviceType?: string): Promise<ApplicationCustomerDTO | undefined> => {
        let customer: Customer | undefined;

        if (validateEmailFormat(customerId)) {
            customer = await this.customerRepository.findByEmail(customerId);
        } else {
            customer = await this.customerRepository.findById(customerId);
        }

        if (!customer) {
            throw new NotFoundError(`Customer not found for id ${customerId}`);
        }

        if (!serviceType) {
            if (customer.applicationCustomerDetail) return customer.toApplicationCustomerDTO();

            throw new NotFoundError(
                `Customer not found for 'Reservation' or 'Application' service with id ${customerId}`,
            );
        }

        if (serviceType === ServiceType.Reservation) {
            if (!customer.reservationCustomerDetail) {
                throw new NotFoundError(`Customer not found for service 'Reservation' with id ${customerId}`);
            }
            return customer.toReservationCustomerDTO();
        }

        if (serviceType === ServiceType.Application) {
            if (!customer.applicationCustomerDetail) {
                throw new NotFoundError(`Customer not found for service 'Application' with id ${customerId}`);
            }
            return customer.toApplicationCustomerDTO();
        }

        return;
    };
}
