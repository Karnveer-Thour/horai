import { Authorization } from '../../repositories/authorization/Authorization';
import { UserRepository } from '../../repositories/UserRepository';

export class CheckHavePermissionDoAnAction {
    constructor(readonly authorization: Authorization, readonly userRepository: UserRepository) {}
    public execute = async (email: string, resourceName: string, action: string, id?: string): Promise<boolean> => {
        const user = await this.userRepository.findById(email);
        if (!user) {
            return false;
        }
        const resultRole = await this.authorization.checkPermission(
            {
                name: user.role as string,
                role: user.role as string,
            },
            resourceName,
            action,
        );
        if (id) {
            const resultData = await this.authorization.checkPermission(
                {
                    name: user.email,
                    role: user.role as string,
                },
                `${resourceName}_data`,
                id,
            );
            return resultRole && resultData;
        }
        return resultRole;
    };
}
