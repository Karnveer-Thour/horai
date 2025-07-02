import { mock } from 'jest-mock-extended';
import moment from 'moment';
import * as uuid from 'uuid';
import { ResourceEnum } from '../../../../domains/ResourceEnum';
import { Smb } from '../../../../domains/Smb';
import { createTestSmb } from '../../../../domains/Smb.test';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { SmbRepository } from '../../../../usecases/repositories/SmbRepository';
import { deleteAllData } from './PostgresTestUtils.test';

beforeAll(async () => {
    await dbConnection.initialize();
});
afterAll(async () => {
    await dbConnection.close();
});

describe('PostgresSmbRepository', () => {
    const repo = mock<SmbRepository>();
    const id = uuid.v4();
    const now = moment('2021-01-17T20:09:00').toDate();
    const smbItem = new Smb({
        smbId: id,
        amoId: 'amo id',
        resourceType: ResourceEnum.Activity,
        name: 'test name',
        email: 'email',
        imageUrls: ['imageUrls'],
        optionalEmails: ['email'],
        isActive: true,
        createdAt: now,
        updatedAt: now,
    });
    beforeAll(async () => {
        await deleteAllData();
    });
    test('findById should return undefined before save', async () => {
        repo.findById.mockResolvedValue(undefined);
        const saved = await repo.findById(id);
        expect(saved).toBeUndefined();
    });
    test('create and find', async () => {
        repo.findById.mockResolvedValue(smbItem);
        await repo.save(smbItem);
        const saved = await repo.findById(id);
        if (!saved) fail();
        expect(saved.smbId).toEqual(id);
        expect(saved.name).toEqual(smbItem.name);
    });
    test('get all', async () => {
        repo.getAll.mockResolvedValue([smbItem]);
        const smbs = await repo.getAll();
        if (!smbs) fail();
        expect(smbs.length).toEqual(1);
        const newSmb = createTestSmb();
        newSmb.smbId = uuid.v4();
        await repo.save(newSmb);
        const smbSeconds = await repo.getAll();
        expect(smbSeconds.length).toEqual(1);
    });
});
