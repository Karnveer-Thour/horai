import { UserStatus } from '.prisma/client';
import moment from 'moment';
import { LoggedInUser } from '../domains/LoggedInUser';
import { User } from '../domains/User';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { SaveUser } from './SaveUser';

describe('SaveUser', () => {
    const userEmail = 'testuser@horai.com';
    const dateOld = moment('2000-01-22T04:56:07.000Z').toDate();
    const dateNow = moment('2000-01-23T04:56:07.000Z').toDate();
    const dateNew = moment('2000-01-24T04:56:07.000Z').toDate();
    const userRepository = {
        save: jest.fn((user: User) => Promise.resolve()),
        getAll: jest.fn(() => Promise.resolve({ list: [], total: 1 })),
        findById: jest.fn((email: string) => Promise.resolve(undefined)),
        softDeleteById: jest.fn((email: string) =>
            Promise.resolve(
                User.create(
                    userEmail,
                    {
                        status: UserStatus.INACTIVE,
                    },
                    new Date(),
                ),
            ),
        ),
        findByUserId: jest.fn((email: string) => Promise.resolve(undefined)),
    };
    const dateTimeRepo = {
        now: jest.fn(() => dateNow),
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should create correctly', async () => {
        const usecase = new SaveUser(dateTimeRepo, userRepository);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'systemuser@schemeverge.com',
        });
        const res = await usecase.execute(
            { email: 'example@gmail.com', userId: 'userId', role: 'sv', amoId: 'amoId', smbId: 'smbId' },
            user,
        );
        expect(userRepository.save.mock.calls[0][0].email).toEqual('example@gmail.com');
        expect(userRepository.save.mock.calls[0][0].userId).toEqual('userId');
        expect(userRepository.save.mock.calls[0][0].role).toEqual('sv');
        expect(userRepository.save.mock.calls[0][0].amoId).toEqual('amoId');
        expect(userRepository.save.mock.calls[0][0].smbId).toEqual('smbId');
        expect(userRepository.save.mock.calls[0][0].createdAt).toEqual(dateNow);
        expect(userRepository.save.mock.calls[0][0].updatedAt).toEqual(dateNow);
    });

    it('should update correctly', async () => {
        const userNewRepo = {
            ...userRepository,
            findById: jest.fn(
                (id: string): Promise<User | undefined> =>
                    Promise.resolve(
                        User.create(
                            'update@gmail.com',
                            {
                                role: 'sv',
                                userId: 'userId',
                                amoId: 'amoId',
                                smbId: 'smbId',
                            },
                            dateNow,
                        ),
                    ),
            ),
        };
        const usecase = new SaveUser(dateTimeRepo, userNewRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'systemuser@schemeverge.com',
        });
        const res = await usecase.execute(
            { email: 'update@gmail.com', userId: 'userId', role: 'sv', amoId: 'amoIdUpdated', smbId: 'smbIdUpdated' },
            user,
        );
        expect(userNewRepo.save.mock.calls[0][0].email).toEqual('update@gmail.com');
        expect(userNewRepo.save.mock.calls[0][0].userId).toEqual('userId');
        expect(userNewRepo.save.mock.calls[0][0].role).toEqual('sv');
        expect(userNewRepo.save.mock.calls[0][0].amoId).toEqual('amoIdUpdated');
        expect(userNewRepo.save.mock.calls[0][0].smbId).toEqual('smbIdUpdated');
        expect(userNewRepo.save.mock.calls[0][0].createdAt).toEqual(dateNow);
        expect(userNewRepo.save.mock.calls[0][0].updatedAt).toEqual(dateNow);
    });
    it('should throw UnauthorizedError when user is not SV user', async () => {
        const usecase = new SaveUser(dateTimeRepo, userRepository);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
        });

        try {
            const res = await usecase.execute(
                {
                    email: 'example@gmail.com',
                    userId: 'userId',
                    role: 'sv',
                    amoId: 'amoIdUpdated',
                    smbId: 'smbIdUpdated',
                },
                user,
            );
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(userRepository.save.mock.calls.length).toEqual(0);
            expect(e.message).toEqual('');
        }
    });
    it('should throw UnauthorizedError when call without loggedInUser', async () => {
        const usecase = new SaveUser(dateTimeRepo, userRepository);
        try {
            const res = await usecase.execute({
                email: 'example@gmail.com',
                userId: 'userId',
                role: 'sv',
                amoId: 'amoIdUpdated',
                smbId: 'smbIdUpdated',
            });
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(userRepository.save.mock.calls.length).toEqual(0);
            expect(e.message).toEqual('');
        }
    });
});
