import { PrismaClient, Prisma } from '@prisma/client';
import { Retry } from './RetryMiddleware';

export class PrismaConnectionHolder {
    private static prismaClient: PrismaClient<Prisma.PrismaClientOptions, never> | null = null;

    static initialize(): void {
        // if prisma instance have already been initialized, do nothing.
        if (PrismaConnectionHolder.prismaClient !== null) return;

        // init prisma instance
        PrismaConnectionHolder.prismaClient = new PrismaClient();
        PrismaConnectionHolder.prismaClient.$use(Retry());

        // Avoid lazy connection
        PrismaConnectionHolder.prismaClient.$connect();
    }

    static getInstance(): Omit<PrismaClient<Prisma.PrismaClientOptions, never>, '$disconnect'> {
        // throw error when we have no prisma client after initialization.
        if (PrismaConnectionHolder.prismaClient === null) {
            throw new Error(
                'Please call PrismaConnectionHolder.initialize() once before calling this method if you can.',
            );
        }

        return PrismaConnectionHolder.prismaClient;
    }

    static async close() {
        // do nothing when we have no Prisma instance.
        if (PrismaConnectionHolder.prismaClient === null) return;
        await PrismaConnectionHolder.prismaClient.$disconnect();
        PrismaConnectionHolder.prismaClient = null;
    }
}
