import { Authorization } from '../../repositories/authorization/Authorization';
import { UserRepository } from '../../repositories/UserRepository';

export class GetEventIds {
    constructor(readonly authorization: Authorization, readonly userRepository: UserRepository) {}
    public execute = async (email: string): Promise<string[]> => {
        const user = await this.userRepository.findById(email);
        if (!user) {
            return [];
        }
        const policies = await this.authorization.getPolicies();
        const eventIds: string[] = [];
        for (const policy of policies) {
            const isEventDataPolicy = policy.find((item) => item === 'eventResource_data');
            const isUserPolicy = policy.find((item) => item === email);
            if (isUserPolicy && isEventDataPolicy) {
                eventIds.push(policy[2]);
            }
        }
        return eventIds;
    };
}
