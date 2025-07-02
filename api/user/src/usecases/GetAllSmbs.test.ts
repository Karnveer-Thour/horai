import { mock } from 'jest-mock-extended';
import moment from 'moment';
import { LoggedInUser } from '../domains/LoggedInUser';
import { ResourceEnum } from '../domains/ResourceEnum';
import { Smb } from '../domains/Smb';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { GetAllSmbs } from './GetAllSmbs';
import { SmbRepository } from './repositories/SmbRepository';
describe('GetAmos', () => {
    const now = moment('2021-03-01T00:00:00.000Z').toDate();
    const smb = Smb.create(
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

    const smbRepository = mock<SmbRepository>();
    smbRepository.getAll.mockResolvedValue([smb, smbNew]);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw UnauthorizedError when user is anonymous', async () => {
        const usecase = new GetAllSmbs(smbRepository);
        try {
            await usecase.execute(undefined);
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(e.message).toEqual('');
        }
    });
    it('should throw UnauthorizedError when user has no role', async () => {
        const usecase = new GetAllSmbs(smbRepository);
        const loggedInUser = new LoggedInUser({ id: 'testId', email: 'test@example.com' });
        try {
            await usecase.execute(loggedInUser);
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(e.message).toEqual('');
        }
    });

    it('should return a record', async () => {
        const loggedInUser = new LoggedInUser({
            id: 'testId',
            email: 'test@example.com',
            role: 'sv',
        });

        const usecase = new GetAllSmbs(smbRepository);
        try {
            const respData = await usecase.execute(loggedInUser);
            expect(respData).toBeDefined();
        } catch (e: any) {
            console.log(e);
        }
    });
});
