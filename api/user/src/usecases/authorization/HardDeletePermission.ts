import { Authorization } from '../repositories/authorization/Authorization';
import { UserRepository } from '../repositories/UserRepository';
import { LoggedInUser } from '../../domains/LoggedInUser';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { IllegalStateError } from '../errors/IllegalStateError';

export class HardDeletePermission {
    constructor(readonly authorization: Authorization, readonly userRepository: UserRepository) {}
    async execute(
        permission: { subject: string; resource: string; action: string },
        loggedInUser?: LoggedInUser,
    ): Promise<void> {
        if (!loggedInUser || !loggedInUser.isSv()) {
            throw new UnauthorizedError();
        }
        const policy = await this.authorization.hasPolicy(permission);
        if (!policy) {
            throw new IllegalStateError(`Policy not found`);
        }
        await this.authorization.hardDeletePolicy(permission);
    }
}
