import { Authorization } from '../repositories/authorization/Authorization';
import { UserRepository } from '../repositories/UserRepository';
import { LoggedInUser } from '../../domains/LoggedInUser';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export class CreatePermission {
    constructor(readonly authorization: Authorization, readonly userRepository: UserRepository) {}
    async execute(
        permissions: { subject: string; resource: string; action: string }[],
        loggedInUser?: LoggedInUser,
    ): Promise<void> {
        if (!loggedInUser || !loggedInUser.isSv()) {
            throw new UnauthorizedError();
        }
        await this.authorization.createPolicies(permissions);
    }
}
