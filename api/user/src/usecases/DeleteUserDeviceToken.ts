import { LoggedInUser } from '../domains/LoggedInUser';
import { UserDeviceToken } from '../domains/UserDeviceToken';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { UserDeviceTokenRepository } from './repositories/UserDeviceTokenRepository';

export class DeleteUserDeviceToken {
    constructor(readonly userDeviceTokenRepository: UserDeviceTokenRepository) {}

    public execute = async (userDeviceToken: string, loggedInUser?: LoggedInUser): Promise<UserDeviceToken> => {
        if (!loggedInUser) {
            throw new UnauthorizedError();
        }
        return this.userDeviceTokenRepository.deleteByDeviceToken(userDeviceToken);
    };
}
