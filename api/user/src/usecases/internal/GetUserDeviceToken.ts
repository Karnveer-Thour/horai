import { ServiceType } from '../../domains/customer/CustomerEnum';
import { UserDeviceTokenDetailsDTO } from '../../domains/dtos/UserDeviceTokenDetailsDTO';
import { NotFoundError } from '../errors/NotFoundError';
import { ApplicationCustomerRepository } from '../repositories/ApplicationCustomerRepository';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { ReservationCustomerRepository } from '../repositories/ReservationCustomerRepository';
import { UserDeviceTokenRepository } from '../repositories/UserDeviceTokenRepository';
import { UserRepository } from '../repositories/UserRepository';

export class GetUserDeviceToken {
    constructor(
        readonly userRepository: UserRepository,
        readonly customerRepository: CustomerRepository,
        readonly reservationCustomerRepository: ReservationCustomerRepository,
        readonly applicationCustomerRepository: ApplicationCustomerRepository,
        readonly userDeviceTokenRepository: UserDeviceTokenRepository,
    ) {}

    public execute = async (userEmail: string, serviceType: string): Promise<UserDeviceTokenDetailsDTO> => {
        const userDeviceTokens = await this.userDeviceTokenRepository.findByEmailAndServiceType(userEmail, serviceType);
        if (!userDeviceTokens) {
            throw new NotFoundError(`UserDeviceToken not found for id: ${userEmail}`);
        }
        const existingCustomer = await this.customerRepository.findByEmail(userEmail);
        let userDetails = null;
        if (existingCustomer) {
            if (serviceType == ServiceType.Application) {
                userDetails = existingCustomer.applicationCustomerDetail;
            }
            if (serviceType == ServiceType.Reservation) {
                userDetails = existingCustomer.reservationCustomerDetail;
            }
        }
        return new UserDeviceTokenDetailsDTO({
            email: userEmail,
            deviceTokens: userDeviceTokens,
            userDetails: userDetails,
        });
    };
}
