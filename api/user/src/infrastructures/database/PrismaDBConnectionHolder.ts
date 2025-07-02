import { PrismaClient, Prisma } from '@prisma/client';
import { injectable } from 'inversify';
import { Retry } from './RetryMiddleWare';
import { IDatabaseConnectionHolder } from './IDatabaseConnectionHolder';

@injectable()
export class PrismaDBConnectionHolder
    implements IDatabaseConnectionHolder<PrismaClient<Prisma.PrismaClientOptions, never>>
{
    private databaseClient: PrismaClient<Prisma.PrismaClientOptions, never> | null = null;

    async initialize(): Promise<void> {
        // if prisma instance have already been initialized, do nothing.
        if (this.databaseClient !== null) return;

        // init prisma instance
        this.databaseClient = await this.generateConnection();
    }

    private async generateConnection(): Promise<PrismaClient<Prisma.PrismaClientOptions, never>> {
        const result = new PrismaClient();
        result.$use(Retry());

        // Avoid lazy connection
        await result.$connect();
        return result;
    }

    getInstance(): PrismaClient<Prisma.PrismaClientOptions, never> {
        // throw error when we have no prisma client after initialization.
        if (this.databaseClient === null) {
            throw new Error('Please call initialize() once before calling this method if you can.');
        }

        return this.databaseClient;
    }

    async close() {
        // do nothing when we have no Prisma instance.
        if (this.databaseClient === null) return;
        await this.databaseClient.$disconnect();
        this.databaseClient = null;
    }
}
