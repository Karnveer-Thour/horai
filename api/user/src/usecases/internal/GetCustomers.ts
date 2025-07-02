import { CustomerRepository } from '../repositories/CustomerRepository';

import { Customer } from '../../domains/customer/Customer';
import { ApplicationCustomerDTO } from '../../domains/dtos/ApplicationCustomerDetailDTO';
import { ReservationCustomerDTO } from '../../domains/dtos/ReservationCustomerDetailDTO';

export class GetCustomers {
    constructor(readonly customerRepository: CustomerRepository) {}

    public execute = async (customerIds?: string[]): Promise<(ApplicationCustomerDTO | ReservationCustomerDTO)[]> => {
        let customers: Customer[] = [];
        if (customerIds) {
            customers = await this.customerRepository.getAllByIds(customerIds);

            return customers.map(this._mapToDTOByServiceType);
        }

        customers = await this.customerRepository.getAll();

        return customers.map(this._mapToDTOByServiceType);
    };

    _mapToDTOByServiceType = (customer: Customer): ApplicationCustomerDTO | ReservationCustomerDTO => {
        if (customer.applicationCustomerDetail) return customer.toApplicationCustomerDTO();

        return customer.toReservationCustomerDTO();
    };
}
