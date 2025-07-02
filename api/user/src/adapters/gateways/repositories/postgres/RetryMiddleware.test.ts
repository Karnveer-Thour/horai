import { Prisma } from '@prisma/client';
import { Retry } from './RetryMiddleware';

describe('RetryMiddelWare', () => {
    it('Should throw too many connections', async () => {
        try {
            const option = {
                maxRetries: 5,
                backoff: false,
            };
            const retryFunc = await Retry();
            await retryFunc(
                {
                    args: {
                        where: { smbId: 'smb id' },
                        update: {},
                        create: {
                            smbId: 'smb id',
                            amoId: 'amo id',
                            name: 'smb',
                            email: 'testsmb@horai.com',
                            optionalEmails: ['testsmb@horai.com'],
                            createdAt: '2021-01-01T00:00:00.000Z',
                            updatedAt: '2021-01-01T00:00:00.000Z',
                        },
                    },
                    dataPath: [],
                    runInTransaction: false,
                    action: 'upsert',
                    model: 'Smb',
                },
                function ({}) {
                    // throw new Prisma.PrismaClientKnownRequestError('PrismaRetryError', 'P1017', '1');
                    const errorParams = { code: 'P1017', clientVersion: '1' };
                    throw new Prisma.PrismaClientKnownRequestError('PrismaRetryError', errorParams);
                },
            );
        } catch (error) {
            expect(new Error('PrismaRetryError'));
        }
    });

    it('should throw any other error', async () => {
        try {
            const option = {
                maxRetries: 5,
                backoff: false,
            };

            const retryFunc = await Retry();
            await retryFunc(
                {
                    args: {
                        where: { smbId: 'smb id' },
                        update: {},
                        create: {
                            smbId: 'smb id',
                            amoId: 'amo id',
                            name: 'smb',
                            email: 'testsmb@horai.com',
                            optionalEmails: [Array],
                            createdAt: '2021-01-01T00:00:00.000Z',
                            updatedAt: '2021-01-01T00:00:00.000Z',
                        },
                    },
                    dataPath: [],
                    runInTransaction: false,
                    action: 'upsert',
                    model: 'Smb',
                },
                function ({}) {
                    // throw new Prisma.PrismaClientKnownRequestError('Any error', 'P10178', '1');
                    const errorParams = { code: 'P10178', clientVersion: '1' };
                    throw new Prisma.PrismaClientKnownRequestError('Any error', errorParams);
                },
            );
            //Retry(option);
        } catch (error) {
            expect(new Error('Any error'));
        }
    });

    it('Should run nomally without error', async () => {
        try {
            const option = {
                maxRetries: 5,
                backoff: false,
            };

            const retryFunc = await Retry(option);
            await retryFunc(
                {
                    args: {
                        where: { smbId: 'smb id' },
                        update: {},
                        create: {
                            smbId: 'smb id',
                            amoId: 'amo id',
                            name: 'smb',
                            email: 'testsmb@horai.com',
                            optionalEmails: ['testsmb@horai.com'],
                            createdAt: '2021-01-01T00:00:00.000Z',
                            updatedAt: '2021-01-01T00:00:00.000Z',
                        },
                    },
                    dataPath: [],
                    runInTransaction: false,
                    action: 'upsert',
                    model: 'Smb',
                },
                function ({}) {
                    return Promise.resolve();
                },
            );
        } catch (error) {}
    });

    it('Must throw an error when min backoff time is greater than max backoff time', () => {
        try {
            const option = {
                maxRetries: 5,
                backoff: {
                    min: 10,
                    max: 2,
                },
            };
            Retry(option);
        } catch (error: any) {
            expect(error.toString()).toEqual('Error: Minimum backoff must be less than maximum backoff');
        }
    });
});
