import { LoggedInUser } from '../domains/LoggedInUser';
import { ApplicationCustomerRepository } from './repositories/ApplicationCustomerRepository';
import { CustomerRepository } from './repositories/CustomerRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';

import { UnauthorizedError } from './errors/UnauthorizedError';

import { ServiceType } from '../domains/customer/CustomerEnum';
import { NotFoundError } from './errors/NotFoundError';

export class SoftDeleteCustomerById {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly customerRepository: CustomerRepository,
        readonly applicationCustomerRepository: ApplicationCustomerRepository,
    ) {}

    public execute = async (customerId: string, serviceType?: string, user?: LoggedInUser): Promise<void> => {
        if (!user || (!user.isSv() && !user.isSmb())) throw new UnauthorizedError();

        const customer = await this.customerRepository.findById(customerId);
        if (!customer) throw new NotFoundError(`Customer not found for id ${customerId}`);

        /* Update Application Customer Details */
        if (!serviceType || serviceType === ServiceType.Application) {
            const appCustomerDetail = customer.applicationCustomerDetail;
            if (!appCustomerDetail) {
                throw new NotFoundError(`Customer not found for service 'Application' with id ${customerId}`);
            }

            await this.applicationCustomerRepository.softDeleteById(appCustomerDetail.applicationCustomerDetailId);
        }
    };
}
