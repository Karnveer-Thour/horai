import { ServiceType } from '../../domains/customer/CustomerEnum';
import { DxCoreUserDeviceTokenDetailsDTO } from '../../domains/dtos/DxCoreUserDeviceTokenDetailsDTO';
import { UserDeviceToken } from '../../domains/UserDeviceToken';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { UserDeviceTokenRepository } from '../repositories/UserDeviceTokenRepository';

export class GetAllDxCoreUserDeviceToken {
    constructor(
        readonly customerRepository: CustomerRepository,
        readonly userDeviceTokenRepository: UserDeviceTokenRepository,
    ) {}

    public execute = async (serviceType: ServiceType): Promise<any> => {
        const existingCustomers = await this.customerRepository.getCustomersWithConnectedDetailsByAppType();

        const response: DxCoreUserDeviceTokenDetailsDTO[] = [];

        if (existingCustomers.length === 0) {
            return response;
        }

        const allCustomerEmails: string[] = existingCustomers.map((customer) => customer.email);

        const allUserDeviceTokens = await this.userDeviceTokenRepository.findByEmailsAndServiceType(
            allCustomerEmails,
            serviceType,
        );
        if (!allUserDeviceTokens || allCustomerEmails.length === 0) {
            return response;
        }

        const deviceTokenMap = new Map<string, UserDeviceToken[]>();

        allUserDeviceTokens?.forEach((token) => {
            // If the email already exists in the Map, append the token; otherwise, create a new array.
            const tokens = deviceTokenMap.get(token.email) || [];
            tokens.push(token);
            deviceTokenMap.set(token.email, tokens);
        });

        deviceTokenMap.forEach((deviceTokens, email) => {
            response.push(
                new DxCoreUserDeviceTokenDetailsDTO({
                    email: email,
                    deviceTokens: deviceTokens,
                }),
            );
        });

        return response;
    };
}
