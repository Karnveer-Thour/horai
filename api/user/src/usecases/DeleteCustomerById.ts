import { LoggedInUser } from '../domains/LoggedInUser';
import { ApplicationCustomerRepository } from './repositories/ApplicationCustomerRepository';
import { CustomerRepository } from './repositories/CustomerRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';

import { UnauthorizedError } from './errors/UnauthorizedError';

import { ServiceType } from '../domains/customer/CustomerEnum';
import { NotFoundError } from './errors/NotFoundError';
import { FirebaseRepository } from './repositories/FirebaseRepository';
import { StripeCustomerRepository } from './repositories/StripeCustomerRepository';

export class DeleteCustomerById {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly customerRepository: CustomerRepository,
        readonly applicationCustomerRepository: ApplicationCustomerRepository,
        readonly firebaseRepository: FirebaseRepository,
        readonly stripeCustomerRepository: StripeCustomerRepository,
    ) {}

    public execute = async (customerId: string, serviceType?: string, user?: LoggedInUser): Promise<void> => {
        if (!user) throw new UnauthorizedError();

        const customer = await this.customerRepository.findById(customerId);
        if (!customer) throw new NotFoundError(`Customer not found for id ${customerId}`);
        if (!user.isSv() && !user.isSmb() && user.email !== customer.email) throw new UnauthorizedError();

        // DELETE Application Customer Details
        if (!serviceType || serviceType === ServiceType.Application) {
            const appCustomer = customer.applicationCustomerDetail;
            if (!appCustomer) {
                throw new NotFoundError(`Customer not found for service 'Application' with id ${customerId}`);
            }

            await this.applicationCustomerRepository.softDeleteById(appCustomer.applicationCustomerDetailId);
        }

        await this.customerRepository.softDeleteById(customerId);
        await this.firebaseRepository.deleteUser(customer.connectedFirebaseId);
        await this.stripeCustomerRepository.deleteStripeCustomer(customer.connectedFirebaseId);
    };
}
