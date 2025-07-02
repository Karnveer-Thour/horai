import { UserStatus } from '@prisma/client';
import moment from 'moment';
import * as uuid from 'uuid';
import { User } from '../../../../domains/User';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { PostgresUserRepository } from './PostgresUserRepository';

beforeAll(async () => {
    await dbConnection.initialize();
});
afterAll(async () => {
    await dbConnection.close();
});
describe('PostgresUserRepository', () => {
    const repo = new PostgresUserRepository();
    const date = '2021-01-01T00:00:00.000Z';
    beforeAll(async () => {
        await dbConnection.initialize();
        const prisma = await dbConnection.getInstance();
        await prisma.smb.upsert({
            where: { smbId: 'smb id' },
            update: {},
            create: {
                smbId: 'smb id',
                amoId: 'amo id',
                name: 'smb',
                email: 'testsmb@horai.com',
                imageUrls: ['imageUrls'],
                optionalEmails: ['testsmb@horai.com'],
                createdAt: date,
                updatedAt: date,
            },
        });
        await prisma.amo.upsert({
            where: { amoId: 'amo id' },
            update: {},
            create: {
                amoId: 'amo id',
                name: 'smb',
                email: 'testsmb@horai.com',
                createdAt: date,
                updatedAt: date,
            },
        });
    });
    afterAll(async () => {
        const prisma = await dbConnection.getInstance();
        await prisma.amo.delete({
            where: {
                amoId: 'amo id',
            },
        });
        await prisma.smb.delete({
            where: {
                smbId: 'smb id',
            },
        });
        await dbConnection.close();
    });
    describe('findById', () => {
        const email = 'this_does_exist@gmail.com';
        const now = moment('2021-01-18T20:09:00').toDate();

        test('should undefined if not found', async () => {
            const user = await repo.findById('this_does_not_exist@gmail.com');
            expect(user).toBeUndefined();
        });

        test('create and find', async () => {
            const userItem = new User({
                email,
                userId: 'hari2cda061d-b4d7-45b2-b63c-621e2c22562f@gmail.com',
                role: 'sv',
                amoId: 'amo id',
                smbId: 'smb id',
                createdAt: now,
                updatedAt: now,
            });
            await repo.save(userItem);
            const user = await repo.findById(email);
            expect(user).toBeDefined();
        });
    });

    describe('getAll', () => {
        test('get all with default params', async () => {
            const users = await repo.getAll();
            expect(users.list.length).toBeGreaterThanOrEqual(1);
        });

        test('get with custom page and pageSize', async () => {
            const users = await repo.getAll(2, 3);
            expect(users.list.length).toBeGreaterThanOrEqual(1);
        });
    });

    test('softDeleteById', async () => {
        const id = uuid.v4();
        const emailId = `test${id}@horai.com`;
        const userItem = new User({
            email: emailId,
            userId: id,
            role: 'sv',
            amoId: 'amo id',
            smbId: 'smb id',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await repo.save(userItem);
        const user = await repo.findById(emailId);
        const deletedUser = await repo.softDeleteById(emailId);
        expect(user?.status).toEqual(UserStatus.ACTIVE);
        expect(deletedUser.status).toEqual(UserStatus.INACTIVE);
    });
    describe('findByUserId', () => {
        const id = uuid.v4();
        const RenEmail = 'test' + `${id}` + '@gmail.com';
        const emailId = RenEmail;
        const now = moment('2021-01-18T20:09:00').toDate();

        const userItem = new User({
            email: emailId,
            userId: id,
            role: 'sv',
            amoId: 'amo id',
            smbId: 'smb id',
            createdAt: now,
            updatedAt: now,
        });

        it('should return undefined if user not found', async () => {
            const user = await repo.findByUserId(id);
            expect(user).toBeUndefined();
        });

        it('should return a user if found ', async () => {
            await repo.save(userItem);
            const saved = await repo.findByUserId(id);
            if (!saved) fail();
            expect(saved.userId).toEqual(id);
        });
    });
});
