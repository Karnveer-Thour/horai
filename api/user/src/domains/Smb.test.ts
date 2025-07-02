import moment from 'moment';
import { ResourceEnum } from '../domains/ResourceEnum';
import { Smb } from './Smb';

export const createTestSmb = () =>
    Smb.create(
        'smbId1',
        'amoId1',
        ResourceEnum.Activity,
        {
            name: 'name',
            email: 'smb@example.com',
            imageUrls: ['imageUrls'],
        },
        true,
        moment('2001-01-01T00:00:00.000Z').toDate(),
    );

describe('Smb', () => {
    const time1 = moment('2001-01-23T04:56:07.000Z').toDate();

    test('create', async () => {
        const smb = Smb.create(
            'smbId',
            'amoId',
            ResourceEnum.Activity,
            {
                name: 'name',
                email: 'smb@example.com',
                imageUrls: ['imageUrls'],
                optionalEmails: ['smb@example.com'],
            },
            true,
            time1,
        );
        expect(smb.smbId).toEqual('smbId');
        expect(smb.amoId).toEqual('amoId');
        expect(smb.name).toEqual('name');
        expect(smb.email).toEqual('smb@example.com');
        expect(smb.optionalEmails).toEqual(['smb@example.com']);
        expect(smb.createdAt).toEqual(time1);
        expect(smb.updatedAt).toEqual(time1);
        const updatedAt = moment('2010-01-23T04:56:07.000Z').toDate();
        smb.update(
            {
                name: 'updated name',
                email: 'updatedsmb@example.com',
                imageUrls: ['imageUrls'],
                optionalEmails: ['updatedsmb@example.com'],
            },
            updatedAt,
        );
        expect(smb.smbId).toEqual(`smbId`);
        expect(smb.amoId).toEqual('amoId');
        expect(smb.name).toEqual('updated name');
        expect(smb.email).toEqual('updatedsmb@example.com');
        expect(smb.optionalEmails).toEqual(['updatedsmb@example.com']);
        expect(smb.createdAt).toEqual(time1);
        expect(smb.updatedAt).toEqual(updatedAt);
    });
    test('getEmail', async () => {
        const smb = Smb.create(
            'smbId',
            'amoId',
            ResourceEnum.Activity,
            {
                name: 'name',
                email: 'smb@example.com',
                imageUrls: ['imageUrls'],
                optionalEmails: ['smb@example.com', 'smb1@example.com'],
            },
            true,
            time1,
        );
        expect(smb.optionalEmails).toEqual(['smb@example.com', 'smb1@example.com']);
        expect(smb.getSmbEmail()).toEqual(['smb@example.com', 'smb1@example.com']);
    });
});
