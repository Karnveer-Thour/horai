import { UserListDTO } from '../domains/dtos/UserListDTO';
import { UserRepository } from './repositories/UserRepository';

export class GetUsers {
    constructor(readonly userRepository: UserRepository) {}

    public execute = async (startIndex: number = 1, endIndex: number = 20): Promise<UserListDTO | undefined> => {
        return await this.userRepository.getAll(startIndex, endIndex);
    };
}
