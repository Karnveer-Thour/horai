import { LoggedInUser } from '../domains/LoggedInUser';
import { User } from '../domains/User';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { UserRepository } from './repositories/UserRepository';

export class DeleteUser {
    constructor(readonly userRepository: UserRepository) {}

    public execute = async (userEmail: string, loggedInUser?: LoggedInUser): Promise<User> => {
        if (!loggedInUser || !loggedInUser.isSv()) {
            throw new UnauthorizedError();
        }
        return this.userRepository.softDeleteById(userEmail);
    };
}
