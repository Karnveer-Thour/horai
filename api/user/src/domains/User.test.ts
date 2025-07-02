import moment from 'moment';
import { ResourceEnum } from '../domains/ResourceEnum';
import { Amo } from './Amo';
import { Smb } from './Smb';
import { User } from './User';

describe('User', () => {
    const time1 = moment('2001-01-23T04:56:07.000Z').toDate();
    test('create', async () => {
        const user = User.create(
            'example@gmail.com',
            {
                role: 'sv',
                userId: 'userId',
                amoId: 'amoId',
                smbId: 'smbId',
            },
            time1,
        );
        expect(user.email).toEqual('example@gmail.com');
        expect(user.userId).toEqual('userId');
        expect(user.role).toEqual('sv');
        expect(user.amoId).toEqual('amoId');
        expect(user.smbId).toEqual('smbId');
        expect(user.createdAt).toEqual(time1);
        expect(user.updatedAt).toEqual(time1);
    });
    describe('update', () => {
        const user = User.create(
            'example@gmail.com',
            {
                role: 'sv',
                userId: 'userId',
                amoId: 'amoId',
                smbId: 'smbId',
            },
            time1,
        );
        const updatedAt = moment('2010-01-23T04:56:07.000Z').toDate();

        it('update correctly', () => {
            user.update(
                {
                    role: 'amo',
                    userId: 'userIdUpdated',
                    amoId: 'amoIdUpdated',
                    smbId: 'smbIdUpdated',
                },
                updatedAt,
            );
            expect(user.userId).toEqual(`userIdUpdated`);
            expect(user.role).toEqual('amo');
            expect(user.amoId).toEqual('amoIdUpdated');
            expect(user.smbId).toEqual('smbIdUpdated');
            expect(user.createdAt).toEqual(time1);
            expect(user.updatedAt).toEqual(updatedAt);
        });
        it('should update without role', () => {
            user.update(
                { role: 'amo', userId: 'userIdUpdated', amoId: 'amoIdUpdated', smbId: 'smbIdUpdated' },
                updatedAt,
            );
            expect(user.userId).toEqual(`userIdUpdated`);
            expect(user.role).toEqual('amo');
            expect(user.amoId).toEqual('amoIdUpdated');
            expect(user.smbId).toEqual('smbIdUpdated');
            expect(user.createdAt).toEqual(time1);
            expect(user.updatedAt).toEqual(updatedAt);
        });
        it('should update without amoId', () => {
            user.update(
                {
                    role: 'amo',
                    userId: 'userIdUpdated',
                    smbId: 'smbIdUpdated',
                    amoId: 'amoid',
                },
                updatedAt,
            );
            expect(user.userId).toEqual(`userIdUpdated`);
            expect(user.role).toEqual('amo');
            expect(user.amoId).toEqual('amoid');
            expect(user.smbId).toEqual('smbIdUpdated');
            expect(user.createdAt).toEqual(time1);
            expect(user.updatedAt).toEqual(updatedAt);
        });
        it('should update without smbId', () => {
            user.update({ smbId: 'smbid', userId: 'userIdUpdated', role: 'amo', amoId: 'amoIdUpdated' }, updatedAt);
            expect(user.userId).toEqual(`userIdUpdated`);
            expect(user.role).toEqual('amo');
            expect(user.amoId).toEqual('amoIdUpdated');
            expect(user.smbId).toEqual('smbid');
            expect(user.createdAt).toEqual(time1);
            expect(user.updatedAt).toEqual(updatedAt);
        });
        describe('setAmo', () => {
            it('should update amo of user', () => {
                user.setAmo(
                    Amo.create(
                        user.amoId || 'amoId',
                        {
                            name: 'name',
                            email: 'test@horai.com',
                            isActive: true,
                        },
                        new Date(),
                    ),
                );
                expect(user.getAmo()).toBeDefined();
                expect(user.getAmo()?.amoId).toEqual(user.amoId);
            });
            it('should throw error if amo is invalid', () => {
                try {
                    user.setAmo(
                        Amo.create(
                            'amoIdInvalid',
                            {
                                name: 'name',
                                email: 'test@horai.com',
                                isActive: true,
                            },
                            new Date(),
                        ),
                    );
                    fail();
                } catch (err: any) {
                    expect(err).toBeDefined();
                    expect(err.message).toEqual('Cannot assign amo to user for amoId: amoIdInvalid');
                }
            });
        });
        describe('setSmb', () => {
            it('should update smb of user', () => {
                user.setSmb(
                    Smb.create(
                        user.smbId || 'smbId',
                        'amoId',
                        ResourceEnum.Activity,
                        {
                            name: 'name',
                            email: 'test@horai.com',
                            imageUrls: ['imageUrls'],
                        },
                        true,
                        new Date(),
                    ),
                );
                expect(user.getSmb()).toBeDefined();
                expect(user.getSmb()?.smbId).toEqual(user.smbId);
            });
            it('should throw error if smb is invalid', () => {
                try {
                    user.setSmb(
                        Smb.create(
                            'smbIdInvalid',
                            'amoId',
                            ResourceEnum.Activity,
                            {
                                name: 'name',
                                email: 'test@horai.com',
                                imageUrls: ['imageUrls'],
                            },
                            true,
                            new Date(),
                        ),
                    );
                    fail();
                } catch (err: any) {
                    expect(err).toBeDefined();
                    expect(err.message).toEqual('Cannot assign smb to user for smbId: smbIdInvalid');
                }
            });
        });
    });
});
