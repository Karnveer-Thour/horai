import { mock } from 'jest-mock-extended';
import moment from 'moment';
import { LoggedInUser } from '../domains/LoggedInUser';
import { ResourceEnum } from '../domains/ResourceEnum';
import { Smb } from '../domains/Smb';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { GetSmbs } from './GetSmbs';
import { SmbRepository } from './repositories/SmbRepository';

describe('GetSmbs', () => {
    const now = moment('2021-03-01T00:00:00.000Z').toDate();
    const smb = Smb.create(
        'smbId',
        'amoId',
        ResourceEnum.Activity,
        {
            name: 'testName',
            email: 'test@example.com',
            imageUrls: ['imageUrls'],
            optionalEmails: ['test@example.com'],
        },
        true,
        now,
    );
    const smb2 = Smb.create(
        'smbId2',
        'amoId2',
        ResourceEnum.Activity,
        {
            name: 'testName2',
            email: 'test2@example.com',
            imageUrls: ['imageUrls'],
            optionalEmails: ['test2@example.com'],
        },
        true,
        now,
    );
    const smbRepo = mock<SmbRepository>();

    it('should throw UnauthorizedError when user is not SV user', async () => {
        const usecase = new GetSmbs(smbRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
        });

        try {
            const res = await usecase.execute(smb.amoId, user);
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(e.message).toEqual('');
        }
    });

    it('should return all data when user is sv', async () => {
        smbRepo.getAllByAmoId.calledWith('').mockReturnValue(Promise.resolve([smb, smb2]));
        const usecase = new GetSmbs(smbRepo);
        const loggedInUser = new LoggedInUser({ id: 'testId', email: 'test@example.com', role: 'sv' });
        const items = await usecase.execute('', loggedInUser);
        expect(items.length).toEqual(2);
        expect(items[0].smbId).toEqual('smbId');
        expect(items[0].amoId).toEqual('amoId');
        expect(items[0].name).toEqual('testName');
        expect(items[0].email).toEqual('test@example.com');
    });

    it('should fetch smb using amoid when user is sv', async () => {
        smbRepo.getAllByAmoId.calledWith(smb.amoId).mockReturnValue(Promise.resolve([smb]));
        const usecase = new GetSmbs(smbRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
            role: 'sv',
        });
        const res = await usecase.execute(smb.amoId, user);
        expect(res.length).toEqual(1);
        expect(res[0].smbId).toEqual(smb.smbId);
    });
});
