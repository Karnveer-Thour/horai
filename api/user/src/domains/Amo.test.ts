import moment from 'moment';
import { Amo } from './Amo';

describe('Amo', () => {
    const time1 = moment('2001-01-23T04:56:07.000Z').toDate();

    test('create', async () => {
        const amo = Amo.create(
            'amoId',
            {
                name: 'name',
                email: 'amo@example.com',
                isActive: true,
            },
            time1,
        );
        expect(amo.amoId).toEqual('amoId');
        expect(amo.name).toEqual('name');
        expect(amo.email).toEqual('amo@example.com');
        expect(amo.createdAt).toEqual(time1);
        expect(amo.updatedAt).toEqual(time1);
        const updatedAt = moment('2010-01-23T04:56:07.000Z').toDate();
        amo.update(
            {
                name: 'updated name',
                email: 'updatedamo@example.com',
                isActive: true,
            },
            updatedAt,
        );
        expect(amo.amoId).toEqual(`amoId`);
        expect(amo.name).toEqual('updated name');
        expect(amo.email).toEqual('updatedamo@example.com');
        expect(amo.createdAt).toEqual(time1);
        expect(amo.updatedAt).toEqual(updatedAt);
    });
});
