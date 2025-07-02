import { LoggedInUser } from '../domains/LoggedInUser';
import { NotFoundError } from './errors/NotFoundError';
import { CustomerRepository } from './repositories/CustomerRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { ApplicationCustomerRepository } from './repositories/ApplicationCustomerRepository';
import { UnauthorizedError } from './errors/UnauthorizedError';

export class SaveBizUser {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly customerRepository: CustomerRepository,
        readonly applicationCustomerRepository: ApplicationCustomerRepository,
    ) {}

    public execute = async (bizDetail: string, user?: LoggedInUser): Promise<void> => {
        if (!user) throw new UnauthorizedError();

        const now = this.dateTimeRepository.now();
        const customer = await this.customerRepository.findByCustomerFirebaseId(user.id);
        console.log('[gcp logs]: customer', customer);
        if (!customer) {
            throw new NotFoundError(`Customer not found for id ${user.id}`);
        }
        console.log('[gcp logs]: bizDetail', bizDetail);
        const parsedData = JSON.parse(bizDetail);
        console.log('[gcp logs]: parsedData', parsedData);
        const userId = parsedData.user_id;

        const updatedCustomer = customer.addBizUserIdByCustomerId(
            customer.customerId,
            {
                bizUserId: userId,
                bizPayload: bizDetail,
                isBizUser: true,
            },
            now,
        );

        if (updatedCustomer) {
            await this.customerRepository.update(updatedCustomer);
        } else {
            throw new NotFoundError(`Customer not found for id ${user.id}`);
        }
    };
}
