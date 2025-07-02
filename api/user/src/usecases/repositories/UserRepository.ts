import { User } from '../../domains/User';
import { UserListDTO } from '../../domains/dtos/UserListDTO';

export interface UserRepository {
    getAll(startIndex?: number, endIndex?: number): Promise<UserListDTO>;
    save(user: User): Promise<void>;
    findById(email: string): Promise<User | undefined>;
    softDeleteById(email: string): Promise<User>;
    findByUserId(userId: string): Promise<User | undefined>;
}
