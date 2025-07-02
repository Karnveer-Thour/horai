import { ConnectedCustomerDetails } from '../customer/ConnectedCustomerDetails';
import { UserDeviceToken } from '../UserDeviceToken';

export class DxCoreUserDeviceTokenDetailsDTO {
    email: string;
    deviceTokens: UserDeviceToken[];

    constructor(input: Pick<DxCoreUserDeviceTokenDetailsDTO, 'email' | 'deviceTokens'>) {
        Object.assign(this, input);
        this.email = input.email;
        this.deviceTokens = input.deviceTokens;
    }
}
