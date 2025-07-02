import { Authorization } from '../repositories/authorization/Authorization';
import { UserRepository } from '../repositories/UserRepository';
import { LoggedInUser } from '../../domains/LoggedInUser';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { IllegalStateError } from '../errors/IllegalStateError';

export class UpdatePermission {
    constructor(readonly authorization: Authorization, readonly userRepository: UserRepository) {}
    async execute(
        permission: { subject: string; resource: string; action: string },
        updatingPermission: { subject: string; resource: string; action: string },
        loggedInUser?: LoggedInUser,
    ): Promise<void> {
        if (!loggedInUser || !loggedInUser.isSv()) {
            throw new UnauthorizedError();
        }
        const policy = await this.authorization.hasPolicy(permission);
        if (!policy) {
            throw new IllegalStateError(`Policy not found`);
        }
        await this.authorization.updatePolicy(
            {
                subject: permission.subject,
                resource: permission.resource,
                action: permission.action,
            },
            {
                subject: updatingPermission.subject,
                resource: updatingPermission.resource,
                action: updatingPermission.action,
            },
        );
    }
}
