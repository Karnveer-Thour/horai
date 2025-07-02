import { mock } from 'jest-mock-extended';
import moment from 'moment';
import { LoggedInUser } from '../domains/LoggedInUser';
import { User } from '../domains/User';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { GetUsers } from './GetUsers';
import { UserRepository } from './repositories/UserRepository';
import { SaveUser } from './SaveUser';

describe('GetUsers', () => {
    const repo = mock<UserRepository>();
    it('should list users with custom pagination', async () => {
        const usecase = new GetUsers(repo);
        await usecase.execute(5, 10);
        expect(repo.getAll).toHaveBeenCalledWith(5, 10);
    });

    it('should list users with defaut pagination', async () => {
        const usecase = new GetUsers(repo);
        const users = await usecase.execute();
        expect(repo.getAll).toHaveBeenCalledWith(1, 20);
    });
});
describe('SaveUser', () => {
    const dateNow = moment('2000-01-23T04:56:07.000Z').toDate();
    const repo = mock<UserRepository>();
    const dateTimeRepo = {
        now: jest.fn(() => dateNow),
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should create user record correctly', async () => {
        const useCase = new SaveUser(dateTimeRepo, repo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
            role: 'sv',
        });
        const res = await useCase.execute(
            {
                role: 'amo',
                amoId: 'amoId',
                smbId: 'smbId',
                userId: 'userId',
                email: 'abc@example.com',
            },
            user,
        );
        expect(repo.save.mock.calls[0][0].role).toEqual('amo');
        expect(repo.save.mock.calls[0][0].amoId).toEqual('amoId');
        expect(repo.save.mock.calls[0][0].smbId).toEqual('smbId');
        expect(repo.save.mock.calls[0][0].email).toEqual('abc@example.com');
        expect(repo.save.mock.calls[0][0].createdAt).toEqual(dateNow);
        expect(repo.save.mock.calls[0][0].updatedAt).toEqual(dateNow);
    });
    it('should update user record correctly', async () => {
        const userRepo = {
            ...repo,
            findById: jest.fn(
                (id: string): Promise<User | undefined> =>
                    Promise.resolve(
                        User.create(
                            'abc@example.com',
                            {
                                role: 'amo',
                                amoId: 'amoid',
                                smbId: 'smbId',
                                userId: 'userId',
                            },
                            dateNow,
                        ),
                    ),
            ),
        };
        const usecase = new SaveUser(dateTimeRepo, userRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
            role: 'sv',
        });
        const res = await usecase.execute(
            {
                role: 'amo',
                amoId: 'amoId',
                smbId: 'smbid',
                email: 'abc@example.com',
                userId: 'userid',
            },
            user,
        );
        expect(repo.save.mock.calls[0][0].smbId).toEqual('smbid');
        expect(repo.save.mock.calls[0][0].amoId).toEqual('amoId');
        expect(repo.save.mock.calls[0][0].role).toEqual('amo');
        expect(repo.save.mock.calls[0][0].email).toEqual('abc@example.com');
        expect(repo.save.mock.calls[0][0].userId).toEqual('userid');
        expect(repo.save.mock.calls[0][0].createdAt).toEqual(dateNow);
        expect(repo.save.mock.calls[0][0].updatedAt).toEqual(dateNow);
    });

    it('should throw UnauthorizedError when user is not SV user', async () => {
        const usecase = new SaveUser(dateTimeRepo, repo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
        });

        try {
            const res = await usecase.execute(
                {
                    role: 'amo',
                    amoId: 'amoId',
                    smbId: 'smbid',
                    email: 'abc@example.com',
                    userId: 'userid',
                },
                user,
            );
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(repo.save.mock.calls.length).toEqual(0);
            expect(e.message).toEqual('');
        }
    });
    it('should throw UnauthorizedError when call without loggedInUser', async () => {
        const usecase = new SaveUser(dateTimeRepo, repo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
        });
        try {
            const res = await usecase.execute(
                {
                    role: 'amo',
                    amoId: 'amoId',
                    smbId: 'smbid',
                    email: 'abc@example.com',
                    userId: 'userid',
                },
                user,
            );
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(repo.save.mock.calls.length).toEqual(0);
            expect(e.message).toEqual('');
        }
    });
});
