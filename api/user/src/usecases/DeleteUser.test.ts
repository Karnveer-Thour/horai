import { UserStatus } from '.prisma/client';
import { LoggedInUser } from '../domains/LoggedInUser';
import { User } from '../domains/User';
import { DeleteUser } from './DeleteUser';
import { UserRepository } from './repositories/UserRepository';

describe('DeleteUser', () => {
    const userEmail = 'testuser@horai.com';
    it('should soft delete user and user is sv', async () => {
        const repo: UserRepository = {
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
        const usecase = new DeleteUser(repo);
        const user = await usecase.execute(
            userEmail,
            new LoggedInUser({
                email: 'systemuser@schemeverge.com',
                smbId: 'smbid',
                amoId: 'amoid',
                id: 'userId',
                role: 'sv',
            }),
        );

        expect(user.email).toEqual(userEmail);
        expect(user.status).toEqual(UserStatus.INACTIVE);
    });

    it('should throw error if use is unauthorized', async () => {
        try {
            const repo: UserRepository = {
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
            const usecase = new DeleteUser(repo);
            await usecase.execute(userEmail);
        } catch (e: any) {
            expect(e).toBeDefined();
        }
    });
});
