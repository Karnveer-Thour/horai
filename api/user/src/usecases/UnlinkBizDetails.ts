import { LoggedInUser } from '../domains/LoggedInUser';
import { NotFoundError } from './errors/NotFoundError';
import { CustomerRepository } from './repositories/CustomerRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { ApplicationCustomerRepository } from './repositories/ApplicationCustomerRepository';
import { UnauthorizedError } from './errors/UnauthorizedError';

export class UnlinkBizDetail {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly customerRepository: CustomerRepository,
        readonly applicationCustomerRepository: ApplicationCustomerRepository,
    ) {}

    public execute = async (user?: LoggedInUser): Promise<void> => {
        if (!user) throw new UnauthorizedError();

        const now = this.dateTimeRepository.now();
        let customer = await this.customerRepository.findByCustomerFirebaseId(user.id);
        if (!customer) {
            throw new NotFoundError(`Customer not found for id ${user.id}`);
        }

        customer = customer.updateBizUser();

        await this.customerRepository.update(customer);
    };
}
