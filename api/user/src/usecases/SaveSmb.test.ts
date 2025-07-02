import { mock } from 'jest-mock-extended';
import moment from 'moment';
import { LoggedInUser } from '../domains/LoggedInUser';
import { ResourceEnum } from '../domains/ResourceEnum';
import { Smb } from '../domains/Smb';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { SmbRepository } from './repositories/SmbRepository';
import { SaveSmb } from './SaveSmb';

describe('SaveSmb', () => {
    const dateNow = moment('2000-01-23T04:56:07.000Z').toDate();
    const smbRepo = mock<SmbRepository>();
    const dateTimeRepo = {
        now: jest.fn(() => dateNow),
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should create correctly', async () => {
        const usecase = new SaveSmb(dateTimeRepo, smbRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
            role: 'sv',
        });
        const res = await usecase.execute(
            {
                smbId: 'smbId',
                amoId: 'amoId',
                resourceType: ResourceEnum.Activity,
                name: 'name',
                email: 'smb@example.com',
                imageUrls: ['imageUrls'],
                optionalEmails: ['smb@example.com'],
                isActive: true,
            },
            user,
        );
        expect(smbRepo.save.mock.calls[0][0].smbId).toEqual('smbId');
        expect(smbRepo.save.mock.calls[0][0].amoId).toEqual('amoId');
        expect(smbRepo.save.mock.calls[0][0].name).toEqual('name');
        expect(smbRepo.save.mock.calls[0][0].email).toEqual('smb@example.com');
        expect(smbRepo.save.mock.calls[0][0].createdAt).toEqual(dateNow);
        expect(smbRepo.save.mock.calls[0][0].updatedAt).toEqual(dateNow);
    });

    it('should update correctly', async () => {
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
            dateNow,
        );
        smbRepo.findByAmoId.calledWith(smb.smbId).mockReturnValue(
            Promise.resolve(
                Smb.create(
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
                    dateNow,
                ),
            ),
        );
        const usecase = new SaveSmb(dateTimeRepo, smbRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
            role: 'sv',
        });
        const res = await usecase.execute(
            {
                smbId: 'smbId',
                amoId: 'amoId',
                resourceType: ResourceEnum.Activity,
                name: 'name updated',
                email: 'updatedsmb@example.com',
                imageUrls: ['imageUrls'],
                optionalEmails: ['updatedsmb@example.com'],
                isActive: true,
            },
            user,
        );
        expect(smbRepo.save.mock.calls[0][0].smbId).toEqual('smbId');
        expect(smbRepo.save.mock.calls[0][0].amoId).toEqual('amoId');
        expect(smbRepo.save.mock.calls[0][0].name).toEqual('name updated');
        expect(smbRepo.save.mock.calls[0][0].email).toEqual('updatedsmb@example.com');
        expect(smbRepo.save.mock.calls[0][0].createdAt).toEqual(dateNow);
        expect(smbRepo.save.mock.calls[0][0].updatedAt).toEqual(dateNow);
    });
    it('should throw UnauthorizedError when user is not SV user', async () => {
        const usecase = new SaveSmb(dateTimeRepo, smbRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
        });
        await expect(
            usecase.execute(
                {
                    smbId: 'smbId',
                    amoId: 'amoId',
                    resourceType: ResourceEnum.Activity,
                    name: 'name',
                    email: 'smb@example.com',
                    imageUrls: ['imageUrls'],
                    optionalEmails: ['updatedsmb@example.com'],

                    isActive: true,
                },
                user,
            ),
        ).rejects.toThrow(UnauthorizedError);
    });
    it('should throw UnauthorizedError when call without loggedInUser', async () => {
        const usecase = new SaveSmb(dateTimeRepo, smbRepo);
        await expect(
            usecase.execute({
                smbId: 'smbId',
                amoId: 'amoId',
                resourceType: ResourceEnum.Activity,
                name: 'name',
                email: 'smb@example.com',
                imageUrls: ['imageUrls'],
                optionalEmails: ['updatedsmb@example.com'],
                isActive: true,
            }),
        ).rejects.toThrow(UnauthorizedError);
    });
});
