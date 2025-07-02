import { ServiceType } from './customer/CustomerEnum';

export class UserDeviceToken {
    userDeviceTokenId: string;
    deviceToken: string;
    email: string;
    serviceType: ServiceType;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        input: Pick<UserDeviceToken, 'userDeviceTokenId' | 'createdAt' | 'updatedAt'> & UserDeviceTokenUpdatableField,
    ) {
        Object.assign(this, input);
        this.userDeviceTokenId = input.userDeviceTokenId;
        this.deviceToken = input.deviceToken;
        this.email = input.email;
        this.serviceType = input.serviceType;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }

    public static create = (
        userDeviceTokenId: string,
        item: UserDeviceTokenUpdatableField,
        now: Date,
    ): UserDeviceToken =>
        new UserDeviceToken({
            userDeviceTokenId,
            ...item,
            createdAt: now,
            updatedAt: now,
        });

    public update = (input: UserDeviceTokenUpdatableField, now: Date): UserDeviceToken => {
        this.deviceToken = input.deviceToken;
        this.email = input.email;
        this.serviceType = input.serviceType;
        this.updatedAt = now;
        return this;
    };
}

export type UserDeviceTokenUpdatableField = Pick<UserDeviceToken, 'deviceToken' | 'email' | 'serviceType'>;
