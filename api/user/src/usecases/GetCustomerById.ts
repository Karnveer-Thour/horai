import { LoggedInUser } from '../domains/LoggedInUser';
import { CustomerRepository } from './repositories/CustomerRepository';

import { UnauthorizedError } from './errors/UnauthorizedError';

import { Customer } from '../domains/customer/Customer';
import { ServiceType, SocialAccount } from '../domains/customer/CustomerEnum';
import { ApplicationCustomerDTO } from '../domains/dtos/ApplicationCustomerDetailDTO';
import { NotFoundError } from './errors/NotFoundError';
import { validateEmailFormat } from './utils/EmailFormatValidator';

export class GetCustomerById {
    constructor(readonly customerRepository: CustomerRepository) {}

    public execute = async (
        customerId: string,
        serviceType?: string,
        socialAccount?: SocialAccount,
        user?: LoggedInUser,
    ): Promise<ApplicationCustomerDTO | undefined> => {
        if (!user) {
            throw new UnauthorizedError();
        }

        let customer: Customer | undefined;

        if (validateEmailFormat(customerId)) {
            customer = await this.customerRepository.findByEmail(customerId);
        } else {
            customer = await this.customerRepository.findById(customerId);
        }

        if (!customer) {
            throw new NotFoundError(`Customer not found for id ${customerId}`);
        }

        if (!user.isSv() && !user.isSmb() && user.email !== customer.email) {
            throw new UnauthorizedError();
        }

        if (socialAccount && socialAccount !== SocialAccount.EMAIL && socialAccount !== customer.socialAccount) {
            throw new UnauthorizedError(
                `Customer is not connected with this Social Account ${customerId} ${socialAccount}`,
            );
        }

        if (!serviceType || serviceType === ServiceType.Application) {
            if (!customer.applicationCustomerDetail) {
                throw new NotFoundError(`Customer not found for service 'Application' with id ${customerId}`);
            }
            return customer.toApplicationCustomerDTO();
        }

        return;
    };
}
