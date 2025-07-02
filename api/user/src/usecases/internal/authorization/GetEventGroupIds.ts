import { Authorization } from '../../repositories/authorization/Authorization';
import { UserRepository } from '../../repositories/UserRepository';

export class GetEventGroupIds {
    constructor(readonly authorization: Authorization, readonly userRepository: UserRepository) {}
    public execute = async (email: string): Promise<string[]> => {
        const user = await this.userRepository.findById(email);
        if (!user) {
            return [];
        }
        const policies = await this.authorization.getPolicies();
        const eventGroupIds: string[] = [];
        for (const policy of policies) {
            const isEventGroupDataPolicy = policy.find((item) => item === 'eventGroupResource_data');
            const isUserPolicy = policy.find((item) => item === email);
            if (isUserPolicy && isEventGroupDataPolicy) {
                eventGroupIds.push(isEventGroupDataPolicy[2]);
            }
        }
        return eventGroupIds;
    };
}
