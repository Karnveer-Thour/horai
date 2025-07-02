import { User } from '../../domains/User';
import { NotFoundError } from '../errors/NotFoundError';
import { UserRepository } from '../repositories/UserRepository';

export class GetUser {
    constructor(readonly userRepository: UserRepository) {}

    public execute = async (userEmail: string): Promise<User> => {
        const user = await this.userRepository.findById(userEmail);
        if (!user) {
            throw new NotFoundError(`User not found for id: ${userEmail}`);
        }
        return user;
    };
}
