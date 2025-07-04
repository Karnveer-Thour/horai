import type { Adapter, Model, UpdatableAdapter } from 'casbin';
import type { CasbinRule } from '@prisma/client';

import { Helper } from 'casbin';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';

export class PrismaAdapter implements Adapter, UpdatableAdapter {
    #option?: Prisma.PrismaClientOptions;
    // @ts-ignore
    #prisma: PrismaClient;

    /**
     * @param option It should be PrismaClientOptions or PrismaClient.
     * You should later call open() to activate it.
     */
    constructor(option?: Prisma.PrismaClientOptions | PrismaClient) {
        if (option instanceof PrismaClient) {
            this.#prisma = option;
        } else {
            this.#option = option;
        }
    }

    async updatePolicy(sec: string, ptype: string, oldRule: string[], newRule: string[]): Promise<void> {
        const policy = await this.#prisma.casbinRule.findFirst({
            where: {
                ptype,
                v0: oldRule[0],
                v1: oldRule[1],
                v2: oldRule[2],
            },
        });
        if (policy) {
            await this.#prisma.casbinRule.update({
                where: {
                    id: policy.id,
                },
                data: {
                    v0: newRule[0],
                    v1: newRule[1],
                    v2: newRule[2],
                },
            });
        }
    }

    async loadPolicy(model: Model): Promise<void> {
        const lines = await this.#prisma.casbinRule.findMany();

        for (const line of lines) {
            this.#loadPolicyLine(line, model);
        }
    }

    async savePolicy(model: Model): Promise<boolean> {
        await this.#prisma.$executeRaw`DELETE FROM casbin_rule;`;

        let astMap = model.model.get('p')!;
        const processes: Array<Promise<CasbinRule>> = [];

        for (const [ptype, ast] of astMap) {
            for (const rule of ast.policy) {
                const line = this.#savePolicyLine(ptype, rule);
                const p = this.#prisma.casbinRule.create({
                    data: line,
                });
                processes.push(p);
            }
        }

        astMap = model.model.get('g')!;
        for (const [ptype, ast] of astMap) {
            for (const rule of ast.policy) {
                const line = this.#savePolicyLine(ptype, rule);
                const p = this.#prisma.casbinRule.create({
                    data: line,
                });
                processes.push(p);
            }
        }

        // https://github.com/prisma/prisma-client-js/issues/332
        await Promise.all(processes);

        return true;
    }

    async addPolicy(sec: string, ptype: string, rule: string[]): Promise<void> {
        const line = this.#savePolicyLine(ptype, rule);
        await this.#prisma.casbinRule.create({ data: line });
    }

    async addPolicies(sec: string, ptype: string, rules: string[][]): Promise<void> {
        const processes: Array<Promise<CasbinRule>> = [];
        for (const rule of rules) {
            const line = this.#savePolicyLine(ptype, rule);
            const p = this.#prisma.casbinRule.create({ data: line });
            processes.push(p);
        }

        // https://github.com/prisma/prisma-client-js/issues/332
        await Promise.all(processes);
    }

    async removePolicy(sec: string, ptype: string, rule: string[]): Promise<void> {
        const line = this.#savePolicyLine(ptype, rule);
        await this.#prisma.casbinRule.deleteMany({ where: line });
    }

    async removePolicies(sec: string, ptype: string, rules: string[][]): Promise<void> {
        const processes: Array<Promise<Prisma.BatchPayload>> = [];
        for (const rule of rules) {
            const line = this.#savePolicyLine(ptype, rule);
            const p = this.#prisma.casbinRule.deleteMany({ where: line });
            processes.push(p);
        }

        // https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/transactions#bulk-operations
        await Promise.all(processes);
    }

    async removeFilteredPolicy(
        sec: string,
        ptype: string,
        fieldIndex: number,
        ...fieldValues: string[]
    ): Promise<void> {
        const line: Prisma.CasbinRuleCreateInput = { ptype };

        const idx = fieldIndex + fieldValues.length;
        if (fieldIndex <= 0 && 0 < idx) {
            line.v0 = fieldValues[0 - fieldIndex];
        }
        if (fieldIndex <= 1 && 1 < idx) {
            line.v1 = fieldValues[1 - fieldIndex];
        }
        if (fieldIndex <= 2 && 2 < idx) {
            line.v2 = fieldValues[2 - fieldIndex];
        }
        if (fieldIndex <= 3 && 3 < idx) {
            line.v3 = fieldValues[3 - fieldIndex];
        }
        if (fieldIndex <= 4 && 4 < idx) {
            line.v4 = fieldValues[4 - fieldIndex];
        }
        if (fieldIndex <= 5 && 5 < idx) {
            line.v5 = fieldValues[5 - fieldIndex];
        }

        await this.#prisma.casbinRule.deleteMany({ where: line });
    }

    async close(): Promise<any> {
        return this.#prisma.$disconnect();
    }

    static async newAdapter(option?: Prisma.PrismaClientOptions | PrismaClient): Promise<PrismaAdapter> {
        const a = new PrismaAdapter(option);
        await a.#open();

        return a;
    }

    #open = async (): Promise<void> => {
        if (!this.#option) {
            this.#option = {};
        }
        if (!this.#prisma) {
            this.#prisma = new PrismaClient(this.#option);
        }
        await this.#prisma.$connect();
    };

    #loadPolicyLine = (line: Prisma.CasbinRuleCreateInput, model: Model): void => {
        const result =
            line.ptype + ', ' + [line.v0, line.v1, line.v2, line.v3, line.v4, line.v5].filter((n) => n).join(', ');
        Helper.loadPolicyLine(result, model);
    };

    #savePolicyLine = (ptype: string, rule: string[]): Prisma.CasbinRuleCreateInput => {
        const line: Prisma.CasbinRuleCreateInput = { ptype };

        if (rule.length > 0) {
            line.v0 = rule[0];
        }
        if (rule.length > 1) {
            line.v1 = rule[1];
        }
        if (rule.length > 2) {
            line.v2 = rule[2];
        }
        if (rule.length > 3) {
            line.v3 = rule[3];
        }
        if (rule.length > 4) {
            line.v4 = rule[4];
        }
        if (rule.length > 5) {
            line.v5 = rule[5];
        }

        return line;
    };
    #updatePolicyLine = (ptype: string, rule: string[]): Prisma.CasbinRuleUpdateInput => {
        const line: Prisma.CasbinRuleUpdateInput = { ptype };

        if (rule.length > 0) {
            line.v0 = rule[0];
        }
        if (rule.length > 1) {
            line.v1 = rule[1];
        }
        if (rule.length > 2) {
            line.v2 = rule[2];
        }
        if (rule.length > 3) {
            line.v3 = rule[3];
        }
        if (rule.length > 4) {
            line.v4 = rule[4];
        }
        if (rule.length > 5) {
            line.v5 = rule[5];
        }

        return line;
    };
}
