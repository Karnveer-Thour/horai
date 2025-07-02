import { LoggedInUser } from '../domains/LoggedInUser';
import { User, UserUpdatableField } from '../domains/User';
import { NotFoundError } from './errors/NotFoundError';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { UserRepository } from './repositories/UserRepository';

export class UpdateUser {
    constructor(readonly dateTimeRepository: DateTimeRepository, readonly userRepository: UserRepository) {}

    public execute = async (
        input: Pick<User, 'email'> & UserUpdatableField,
        loggedInUser?: LoggedInUser,
    ): Promise<User> => {
        if (!loggedInUser || !loggedInUser.isSv()) {
            throw new UnauthorizedError();
        }
        const user = await this.userRepository.findById(input.email);

        if (!user) {
            throw new NotFoundError();
        }

        const now = this.dateTimeRepository.now();
        await this.userRepository.save(user.update(input, now));
        return user;
    };
}
