import { LoggedInUser } from '../domains/LoggedInUser';
import { NotFoundError } from './errors/NotFoundError';
import { CustomerRepository } from './repositories/CustomerRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { ConnectedCustomerRepository } from './repositories/ConnectedCustomerRepository';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { ConnectedCustomerDetails } from '../domains/customer/ConnectedCustomerDetails';
import * as uuid from 'uuid';

export class SaveConnectedCustomerDetails {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly customerRepository: CustomerRepository,
        readonly connectedCustomerRepository: ConnectedCustomerRepository,
    ) {}

    public execute = async (
        connectedCustomerDetails: string,
        appType: string,
        user?: LoggedInUser,
    ): Promise<ConnectedCustomerDetails> => {
        if (!user) throw new UnauthorizedError();

        const now = this.dateTimeRepository.now();
        const customer = await this.customerRepository.findByCustomerFirebaseId(user.id);
        if (!customer) {
            throw new NotFoundError(`Customer not found for id ${user.id}`);
        }

        // Check if a ConnectedCustomerDetails entry already exists for this customer and appType
        const existingConnectedCustomerDetails = await this.connectedCustomerRepository.getByCustomerId(
            customer.customerId,
            appType,
        );
        let customerDetail;
        if (existingConnectedCustomerDetails) {
            existingConnectedCustomerDetails.update(
                {
                    connectedCustomerPayload: connectedCustomerDetails,
                    isActive: true,
                    appType: appType,
                },
                now,
            );
            customerDetail = await this.connectedCustomerRepository.update(existingConnectedCustomerDetails);
        } else {
            const ConnectedCustomerDetailsId = uuid.v4();

            const newConnectedCustomerDetails = ConnectedCustomerDetails.create(
                ConnectedCustomerDetailsId,
                customer.customerId,
                appType,
                connectedCustomerDetails,
                now,
            );
            customerDetail = await this.connectedCustomerRepository.create(newConnectedCustomerDetails);
        }
        if (customerDetail) {
            return customerDetail;
        } else {
            throw new Error('Failed to create or update customer details');
        }
    };
}
