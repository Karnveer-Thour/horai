import { LoggedInUser } from '../domains/LoggedInUser';
import { NotFoundError } from './errors/NotFoundError';
import { CustomerRepository } from './repositories/CustomerRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { ConnectedCustomerRepository } from './repositories/ConnectedCustomerRepository';
import { UnauthorizedError } from './errors/UnauthorizedError';

export class UnlinkConnectedCustomerDetails {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly customerRepository: CustomerRepository,
        readonly connectedCustomerRepository: ConnectedCustomerRepository,
    ) {}

    public execute = async (user: LoggedInUser, appType: string): Promise<void> => {
        if (!user) throw new UnauthorizedError();

        const now = this.dateTimeRepository.now();
        const customer = await this.customerRepository.findByCustomerFirebaseId(user.id);
        if (!customer) {
            throw new NotFoundError(`Customer not found for id ${user.id}`);
        }

        // Find connected customer details by customer ID and app type
        const connectedCustomerDetail = await this.connectedCustomerRepository.getByCustomerId(
            customer.customerId,
            appType,
        );
        if (!connectedCustomerDetail) {
            throw new NotFoundError(
                `Connected customer details not found for customer ID ${customer.customerId} and app type ${appType}`,
            );
        }

        // Remove the connected customer detail
        await this.connectedCustomerRepository.delete(connectedCustomerDetail);
    };
}
