import { LoggedInUser } from '../domains/LoggedInUser';
import { User, UserUpdatableField } from '../domains/User';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { UserRepository } from './repositories/UserRepository';

export class SaveUser {
    constructor(readonly dateTimeRepository: DateTimeRepository, readonly userRepository: UserRepository) {}

    public execute = async (
        input: Pick<User, 'email'> & UserUpdatableField,
        loggedInUser?: LoggedInUser,
    ): Promise<void> => {
        if (!loggedInUser || !loggedInUser.isSv()) {
            throw new UnauthorizedError();
        }
        const savedUser = await this.userRepository.findById(input.email);
        const now = this.dateTimeRepository.now();
        const user = savedUser ? savedUser.update(input, now) : User.create(input.email, input, now);
        await this.userRepository.save(user);
    };
}
