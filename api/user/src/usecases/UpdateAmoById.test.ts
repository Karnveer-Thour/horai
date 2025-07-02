import moment from 'moment';
import { UpdateAmoById } from './UpdateAmoById';
import { LoggedInUser } from '../domains/LoggedInUser';
import { Amo } from '../domains/Amo';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { mock } from 'jest-mock-extended';
import { AmoRepository } from './repositories/AmoRepository';

describe('UpdateAmo', () => {
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

    it('should update correctly', async () => {
        amoRepo.findById.mockResolvedValue(
            Amo.create('amoId', { name: 'amo', email: 'amo@gmail.com', isActive: true }, dateNow),
        );

        const usecase = new UpdateAmoById(dateTimeRepo, amoRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'systemuser@schemeverge.com',
        });
        const res = await usecase.execute(
            { amoId: 'amoId', email: 'updated@gmail.com', name: 'updatedAmo', isActive: true },
            user,
        );

        expect(amoRepo.save.mock.calls[0][0].email).toEqual('updated@gmail.com');
        expect(amoRepo.save.mock.calls[0][0].name).toEqual('updatedAmo');
        expect(amoRepo.save.mock.calls[0][0].createdAt).toEqual(dateNow);
        expect(amoRepo.save.mock.calls[0][0].updatedAt).toEqual(dateNow);
    });

    it('should throw UnauthorizedError when user is not SV user', async () => {
        const usecase = new UpdateAmoById(dateTimeRepo, amoRepo);
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
                    isActive: true,
                },
                user,
            ),
        ).rejects.toThrow(UnauthorizedError);
    });
    it('should throw UnauthorizedError when call without loggedInUser', async () => {
        const usecase = new UpdateAmoById(dateTimeRepo, amoRepo);
        await expect(
            usecase.execute({
                amoId: 'amoId',
                name: 'name',
                email: 'smb@example.com',
                isActive: true,
            }),
        ).rejects.toThrow(UnauthorizedError);
    });
});
