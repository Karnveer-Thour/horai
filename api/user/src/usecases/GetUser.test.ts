import { UserStatus } from '.prisma/client';
import { v4 } from 'uuid';
import { User } from '../domains/User';
import { GetUser } from './GetUser';
import { UserRepository } from './repositories/UserRepository';

describe('GetUser', () => {
    const userEmail = 'testuser@horai.com';
    const userId = v4();

    it('should return a user', async () => {
        const repo: UserRepository = {
            save: jest.fn((user: User) => Promise.resolve()),
            getAll: jest.fn(() => Promise.resolve({ list: [], total: 1 })),
            findById: jest.fn((email: string) => Promise.resolve(User.create(userEmail, { userId }, new Date()))),
            findByUserId: jest.fn((email: string) => Promise.resolve(User.create(userEmail, { userId }, new Date()))),
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
        };
        const usecase = new GetUser(repo);
        const user = await usecase.execute(userEmail);
        expect(user).toBeDefined();
        expect(user?.email).toEqual(userEmail);
    });

    it('should throw error when email is not found', async () => {
        try {
            const repo: UserRepository = {
                save: jest.fn((user: User) => Promise.resolve()),
                getAll: jest.fn(() => Promise.resolve({ list: [], total: 1 })),
                findById: jest.fn((email: string) => Promise.resolve(undefined)),
                findByUserId: jest.fn((email: string) => Promise.resolve(undefined)),
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
            };
            const usecase = new GetUser(repo);
            await usecase.execute(userEmail);
        } catch (e: any) {
            expect(e).toBeDefined();
            expect(e.message).toEqual(`User not found for id: ${userEmail}`);
        }
    });
});
