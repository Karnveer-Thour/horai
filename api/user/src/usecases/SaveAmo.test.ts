import moment from 'moment';
import { SaveAmo } from './SaveAmo';
import { LoggedInUser } from '../domains/LoggedInUser';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { mock } from 'jest-mock-extended';
import { AmoRepository } from './repositories/AmoRepository';

describe('SaveSmb', () => {
    const dateOld = moment('2000-01-22T04:56:07.000Z').toDate();
    const dateNow = moment('2000-01-23T04:56:07.000Z').toDate();
    const dateNew = moment('2000-01-24T04:56:07.000Z').toDate();
    const amoRepo = mock<AmoRepository>();
    const dateTimeRepo = {
        now: jest.fn(() => dateNow),
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should create correctly', async () => {
        const usecase = new SaveAmo(dateTimeRepo, amoRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
            role: 'sv',
        });
        const res = await usecase.execute(
            {
                amoId: 'amoId',
                name: 'name',
                email: 'smb@example.com',
            },
            user,
        );

        expect(amoRepo.save.mock.calls[0][0].amoId).toEqual('amoId');
        expect(amoRepo.save.mock.calls[0][0].name).toEqual('name');
        expect(amoRepo.save.mock.calls[0][0].email).toEqual('smb@example.com');
        expect(amoRepo.save.mock.calls[0][0].createdAt).toEqual(dateNow);
        expect(amoRepo.save.mock.calls[0][0].updatedAt).toEqual(dateNow);
    });

    it('should throw UnauthorizedError when user is not SV user', async () => {
        const usecase = new SaveAmo(dateTimeRepo, amoRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
        });
        await expect(
            usecase.execute(
                {
                    amoId: 'amoId',
                    name: 'name',
                    email: 'smb@example.com',
                },
                user,
            ),
        ).rejects.toThrow(UnauthorizedError);
    });
    it('should throw UnauthorizedError when call without loggedInUser', async () => {
        const usecase = new SaveAmo(dateTimeRepo, amoRepo);
        await expect(
            usecase.execute({
                amoId: 'amoId',
                name: 'name',
                email: 'smb@example.com',
            }),
        ).rejects.toThrow(UnauthorizedError);
    });
});
