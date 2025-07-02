import moment from 'moment';
import * as uuid from 'uuid';
import { Amo } from '../../../../domains/Amo';
import { amoRepository, dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';

beforeAll(async () => {
    await dbConnection.initialize();
});
afterAll(async () => {
    await dbConnection.close();
});

describe('PostgresAmoRepository', () => {
    const id = uuid.v4();
    const now = moment('2021-01-17T20:09:00').toDate();
    const amoItem = new Amo({
        amoId: id,
        name: 'hari',
        email: 'autotest-user1@example.com',
        isActive: true,
        createdAt: now,
        updatedAt: now,
    });
    test('findById should return undefined before save', async () => {
        const saved = await amoRepository.findById(id);
        expect(saved).toBeUndefined();
    });
    test('create and find', async () => {
        await amoRepository.save(amoItem);
        const saved = await amoRepository.findById(id);
        if (!saved) fail();
        expect(saved.amoId).toEqual(id);
        expect(saved.name).toEqual(amoItem.name);
        expect(saved.email).toEqual(amoItem.email);
    });
    test('Find all records', async () => {
        const all = await amoRepository.getAll();
        expect(Array.isArray(all)).toBe(true);
    });
});
