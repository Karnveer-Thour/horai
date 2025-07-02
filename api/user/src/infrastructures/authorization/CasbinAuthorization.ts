import { Authorization } from '../../usecases/repositories/authorization/Authorization';
import { IAuthorizationConnectionHolder } from './IAuthorizationConnectionHolder';
// import { Enforcer } from 'casbin/lib/cjs/enforcer';

import { Enforcer } from 'casbin';

export class CasbinAuthorization implements Authorization {
    constructor(readonly casbinIntance: IAuthorizationConnectionHolder<Enforcer>) {}
    async getPolicies(): Promise<string[][]> {
        const instance = this.casbinIntance.getInstance();
        return await instance.getPolicy();
    }

    async createPolicies(policies: { subject: string; resource: string; action: string }[]): Promise<void> {
        const instance = this.casbinIntance.getInstance();
        await instance.addPolicies(
            policies.map((item) => {
                return [item.subject, item.resource, item.action];
            }),
        );
    }

    async updatePolicy(
        currentPolicy: { subject: string; resource: string; action: string },
        updatingPolicy: { subject: string; resource: string; action: string },
    ): Promise<void> {
        const instance = this.casbinIntance.getInstance();
        await instance.updatePolicy(
            [currentPolicy.subject, currentPolicy.resource, currentPolicy.action],
            [updatingPolicy.subject, updatingPolicy.resource, updatingPolicy.action],
        );
    }
    async hardDeletePolicy(policy: { subject: string; resource: string; action: string }): Promise<void> {
        const instance = this.casbinIntance.getInstance();
        await instance.removePolicy(...[policy.subject, policy.resource, policy.action]);
    }
    async hasPolicy(policy: { subject: string; resource: string; action: string }): Promise<boolean> {
        const instance = this.casbinIntance.getInstance();
        const result = await instance.hasPolicy(policy.subject, policy.resource, policy.action);
        return result;
    }

    async checkPermission(
        subject: {
            name: string;
            role: string;
        },
        resource: string,
        action: string,
    ): Promise<boolean> {
        const instance = this.casbinIntance.getInstance();
        return await instance.enforce(subject, resource, action);
    }

    async checkSharedEndpointPermission(
        subject: {
            name: string;
            role: string;
        },
        resource: string,
        action: string,
    ): Promise<boolean> {
        const instance = this.casbinIntance.getInstance();
        return await instance.enforce(subject, resource, action);
    }
}
