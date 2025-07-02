import { mock } from 'jest-mock-extended';
import moment from 'moment';
import { LoggedInUser } from '../domains/LoggedInUser';
import { ResourceEnum } from '../domains/ResourceEnum';
import { Smb } from '../domains/Smb';
import { DeactivateSmb } from './DeactivateSmb';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { SmbRepository } from './repositories/SmbRepository';

describe('Deactivate Smb', () => {
    const dateOld = moment('2000-01-22T04:56:07.000Z').toDate();
    const dateNow = moment('2000-01-23T04:56:07.000Z').toDate();
    const dateNew = moment('2000-01-24T04:56:07.000Z').toDate();
    const smbRepo = mock<SmbRepository>();
    const dateTimeRepo = {
        now: jest.fn(() => dateNow),
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update correctly', async () => {
        smbRepo.findById.mockResolvedValue(
            Smb.create(
                'smbId',
                'amoId',
                ResourceEnum.Activity,
                {
                    name: 'testName',
                    email: 'test@example.com',
                    imageUrls: ['https://imageurl.jpg'],
                    optionalEmails: ['test@example.com'],
                },
                true,
                dateNow,
            ),
        );

        const usecase = new DeactivateSmb(dateTimeRepo, smbRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'systemuser@schemeverge.com',
        });
        const res = await usecase.execute({ smbId: 'smbId', isActive: false }, user);

        expect(smbRepo.save.mock.calls[0][0].email).toEqual('test@example.com');
        expect(smbRepo.save.mock.calls[0][0].name).toEqual('testName');
        expect(smbRepo.save.mock.calls[0][0].isActive).toEqual(false);
        expect(smbRepo.save.mock.calls[0][0].createdAt).toEqual(dateNow);
        expect(smbRepo.save.mock.calls[0][0].updatedAt).toEqual(dateNow);
    });

    it('should throw UnauthorizedError when user is not SV user', async () => {
        const usecase = new DeactivateSmb(dateTimeRepo, smbRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
        });
        await expect(
            usecase.execute(
                {
                    smbId: 'smbId',
                    isActive: true,
                },
                user,
            ),
        ).rejects.toThrow(UnauthorizedError);
    });
    it('should throw UnauthorizedError when call without loggedInUser', async () => {
        const usecase = new DeactivateSmb(dateTimeRepo, smbRepo);
        await expect(
            usecase.execute({
                smbId: 'smbId',
                isActive: true,
            }),
        ).rejects.toThrow(UnauthorizedError);
    });
});
