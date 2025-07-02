import { mock } from 'jest-mock-extended';
import moment from 'moment';
import { LoggedInUser } from '../domains/LoggedInUser';
import { ResourceEnum } from '../domains/ResourceEnum';
import { Smb } from '../domains/Smb';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { GetSmbById } from './GetSmbById';
import { SmbRepository } from './repositories/SmbRepository';

describe('GetSmbs', () => {
    const now = moment('2021-03-01T00:00:00.000Z').toDate();
    const smbId = '515c2b89-a097-4be6-bd03-93dc07a255e8';
    const smbId1 = '8737jdc-a097-4be6-bd03-93dc07a255e8';
    const repo = mock<SmbRepository>();
    const smb = Smb.create(
        smbId,
        'amoId',
        ResourceEnum.Activity,
        {
            name: 'testName',
            email: 'test@example.com',
            imageUrls: ['https://imageurl.jpg'],
            optionalEmails: ['test@example.com'],
        },
        true,
        now,
    );
    const smbNew = Smb.create(
        'smbIdNew',
        'amoIdNew',
        ResourceEnum.Activity,
        {
            name: 'NewtestName',
            email: 'Newtest@example.com',
            imageUrls: ['https://imageurl.jpg'],
        },
        true,
        now,
    );

    it('should throw UnauthorizedError when user is anonymous', async () => {
        repo.getAll.mockResolvedValue([smb, smbNew]);

        const usecase = new GetSmbById(repo);
        try {
            await usecase.execute(smbId);
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(e.message).toEqual('');
        }
    });
    it('should throw UnauthorizedError when user is not Smb user', async () => {
        const usecase = new GetSmbById(repo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
        });

        try {
            const res = await usecase.execute(smbId1, user);
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(e.message).toEqual('');
        }
    });
    it('should return all data when user is sv', async () => {
        repo.findById.mockResolvedValue(smb);
        const usecase = new GetSmbById(repo);
        const loggedInUser = new LoggedInUser({ id: 'testId', email: 'test@example.com', role: 'sv' });
        const items = await usecase.execute(smbId, loggedInUser);
        expect(items.smbId).toEqual('515c2b89-a097-4be6-bd03-93dc07a255e8');
        expect(items.amoId).toEqual('amoId');
        expect(items.name).toEqual('testName');
        expect(items.email).toEqual('test@example.com');
    });

    it('should throw error when smbId of smb item doesnt exist', async () => {
        const usecase = new GetSmbById(repo);
        const loggedInUser = new LoggedInUser({ id: 'testId', email: 'test@example.com', role: 'sv' });

        repo.findById.mockResolvedValue(undefined);
        try {
            const res = await usecase.execute(smbId1, loggedInUser);
        } catch (e: any) {
            expect(e.message).toEqual('smbItem is not found. smbItemId: 8737jdc-a097-4be6-bd03-93dc07a255e8');
        }
    });
});
