import { ApplicationCustomerDetail } from '../customer/ApplicationCustomerDetail';
import { ReservationCustomerDetail } from '../customer/ReservationCustomerDetail';
import { UserDeviceToken } from '../UserDeviceToken';

export class UserDeviceTokenDetailsDTO {
    email: string;
    deviceTokens: UserDeviceToken[];
    userDetails?: ApplicationCustomerDetail | ReservationCustomerDetail | null;

    constructor(input: Pick<UserDeviceTokenDetailsDTO, 'email' | 'deviceTokens' | 'userDetails'>) {
        Object.assign(this, input);
        this.email = input.email;
        this.deviceTokens = input.deviceTokens;
        this.userDetails = input.userDetails;
    }
}
