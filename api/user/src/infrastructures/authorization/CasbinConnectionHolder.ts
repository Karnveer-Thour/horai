import { injectable } from 'inversify';
// import { Enforcer } from 'casbin/lib/cjs/enforcer';
import { Enforcer } from 'casbin';
import { newEnforcer } from 'casbin';
import { IAuthorizationConnectionHolder } from './IAuthorizationConnectionHolder';
import { PrismaAdapter } from './adapter';

@injectable()
export class CasbinConnectionHolder implements IAuthorizationConnectionHolder<Enforcer> {
    private casbinInstance: Enforcer | null = null;
    private casbinAdapterInstance: PrismaAdapter | null = null;

    async initialize(): Promise<void> {
        // if instance have already been initialized, do nothing.
        if (this.casbinInstance !== null) return;

        // init instance
        this.casbinAdapterInstance = await PrismaAdapter.newAdapter();
        this.casbinInstance = await newEnforcer('abac.conf', this.casbinAdapterInstance, true);
    }

    getInstance(): Enforcer {
        // throw error when we have no instance after initialization.
        if (this.casbinInstance === null) {
            throw new Error('Please call initialize() once before calling this method if you can.');
        }

        return this.casbinInstance;
    }

    async addCustomFunctions(): Promise<void> {
        // throw error when we have no instance after initialization.
        if (this.casbinInstance === null) {
            throw new Error('Please call initialize() once before calling this method if you can.');
        }

        await this.casbinInstance.addFunction(
            'key_match_func',
            async (requestKey: string, policyKey: string): Promise<boolean> => {
                if (policyKey === requestKey) {
                    return true;
                }

                return (policyKey || '').includes(`(${requestKey})`);
            },
        );
    }

    async close() {
        // do nothing when we have no instance.
        if (this.casbinAdapterInstance !== null) {
            await this.casbinAdapterInstance.close();
            this.casbinAdapterInstance = null;
        }
        if (this.casbinInstance === null) return;
        this.casbinInstance = null;
    }
}
