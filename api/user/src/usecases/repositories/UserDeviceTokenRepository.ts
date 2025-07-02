import { ServiceType } from '../../domains/customer/CustomerEnum';
import { UserDeviceToken } from '../../domains/UserDeviceToken';

export interface UserDeviceTokenRepository {
    create(userDeviceToken: UserDeviceToken): Promise<void>;
    findById(id: string): Promise<UserDeviceToken | undefined>;
    findByEmailAndServiceType(userEmail: string, serviceType: string): Promise<UserDeviceToken[] | undefined>;
    findByEmailsAndServiceType(userEmails: string[], serviceType: ServiceType): Promise<UserDeviceToken[] | undefined>;
    deleteByDeviceToken(deviceToken: string): Promise<UserDeviceToken>;
}
