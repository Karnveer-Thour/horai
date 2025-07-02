import * as uuid from 'uuid';
import { LoggedInUser } from '../domains/LoggedInUser';
import { UserDeviceToken } from '../domains/UserDeviceToken';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { UserDeviceTokenRepository } from './repositories/UserDeviceTokenRepository';

export class UpdateUserDeviceToken {
    constructor(
        readonly dateTimeRepository: DateTimeRepository,
        readonly userDeviceTokenRepository: UserDeviceTokenRepository,
    ) {}

    public execute = async (
        input: Pick<UserDeviceToken, 'deviceToken' | 'serviceType'>,
        user?: LoggedInUser,
    ): Promise<void> => {
        if (!user) {
            throw new UnauthorizedError();
        }
        const userDeviceTokenId = uuid.v4();
        const now = this.dateTimeRepository.now();
        const userDeviceToken = UserDeviceToken.create(
            userDeviceTokenId,
            { email: user.email, deviceToken: input.deviceToken, serviceType: input.serviceType },
            now,
        );
        await this.userDeviceTokenRepository.create(userDeviceToken);
    };
}
