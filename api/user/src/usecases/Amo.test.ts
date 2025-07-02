import moment from 'moment';
import { Amo } from '../domains/Amo';
import { LoggedInUser } from '../domains/LoggedInUser';
import { GetAmo, GetAmos, SaveAmo } from './Amo';
import { UnauthorizedError } from './errors/UnauthorizedError';

describe('SaveAmo', () => {
    //todo trigger build
    const dateOld = moment('2000-01-22T04:56:07.000Z').toDate();
    const dateNow = moment('2000-01-23T04:56:07.000Z').toDate();
    const dateNew = moment('2000-01-24T04:56:07.000Z').toDate();
    const amoRepo = {
        save: jest.fn((amo: Amo) => Promise.resolve()),
        findById: jest.fn((id: string): Promise<Amo | undefined> => Promise.resolve(undefined)),
        getAll: jest.fn((): Promise<Amo[]> => Promise.resolve([])),
    };
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
                email: 'amo@example.com',
                isActive: true,
            },
            user,
        );
        expect(amoRepo.save.mock.calls[0][0].amoId).toEqual('amoId');
        expect(amoRepo.save.mock.calls[0][0].name).toEqual('name');
        expect(amoRepo.save.mock.calls[0][0].email).toEqual('amo@example.com');
        expect(amoRepo.save.mock.calls[0][0].createdAt).toEqual(dateNow);
        expect(amoRepo.save.mock.calls[0][0].updatedAt).toEqual(dateNow);
    });

    it('should update correctly', async () => {
        const amoNewRepo = {
            ...amoRepo,
            findById: jest.fn(
                (id: string): Promise<Amo | undefined> =>
                    Promise.resolve(
                        Amo.create(
                            'amoId',
                            {
                                name: 'name',
                                email: 'amo@example.com',
                                isActive: true,
                            },
                            dateNow,
                        ),
                    ),
            ),
        };
        const usecase = new SaveAmo(dateTimeRepo, amoNewRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
            role: 'sv',
        });
        const res = await usecase.execute(
            {
                amoId: 'amoId',
                name: 'name updated',
                email: 'updatedamo@example.com',
                isActive: true,
            },
            user,
        );
        expect(amoNewRepo.save.mock.calls[0][0].amoId).toEqual('amoId');
        expect(amoNewRepo.save.mock.calls[0][0].name).toEqual('name updated');
        expect(amoNewRepo.save.mock.calls[0][0].email).toEqual('updatedamo@example.com');
        expect(amoNewRepo.save.mock.calls[0][0].createdAt).toEqual(dateNow);
        expect(amoNewRepo.save.mock.calls[0][0].updatedAt).toEqual(dateNow);
    });
    it('should throw UnauthorizedError when user is not SV user', async () => {
        const usecase = new SaveAmo(dateTimeRepo, amoRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
        });

        try {
            const res = await usecase.execute(
                {
                    amoId: 'amoId',
                    name: 'name',
                    email: 'amo@example.com',
                    isActive: true,
                },
                user,
            );
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(amoRepo.save.mock.calls.length).toEqual(0);
            expect(e.message).toEqual('');
        }
    });
    it('should throw UnauthorizedError when call without loggedInUser', async () => {
        const usecase = new SaveAmo(dateTimeRepo, amoRepo);
        try {
            const res = await usecase.execute({
                amoId: 'amoId',
                name: 'name',
                email: 'amo@example.com',
                isActive: true,
            });
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(amoRepo.save.mock.calls.length).toEqual(0);
            expect(e.message).toEqual('');
        }
    });
});

describe('GetAmos', () => {
    const createdAt = moment('2021-01-10T20:09:00').toDate();
    const old = moment('2021-01-17T20:09:00').toDate();
    const now = moment('2021-03-01T00:00:00.000Z').toDate();
    const amo = Amo.create(
        'amoId',
        {
            name: 'testName',
            email: 'test@example.com',
            isActive: true,
        },
        old,
    );
    const amoNew = Amo.create(
        'amoNewId',
        {
            name: 'testNewName',
            email: 'testnew@example.com',
            isActive: true,
        },
        now,
    );
    const repo = {
        findById: jest.fn((amoId: string): Promise<Amo | undefined> => Promise.resolve(amo)),
        save: jest.fn((amo: Amo) => Promise.resolve()),
        getAll: jest.fn((): Promise<Amo[]> => Promise.resolve([])),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw UnauthorizedError when user is anonymous', async () => {
        repo.getAll = jest.fn(() => Promise.resolve([amo, amoNew]));
        const usecase = new GetAmos(repo);
        try {
            await usecase.execute();
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(e.message).toEqual('');
        }
    });

    it('should throw UnauthorizedError when user has no role', async () => {
        repo.getAll = jest.fn(() => Promise.resolve([amo, amoNew]));
        const usecase = new GetAmos(repo);
        const loggedInUser = new LoggedInUser({ id: 'testId', email: 'test@example.com' });
        try {
            await usecase.execute(loggedInUser);
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(e.message).toEqual('');
        }
    });

    it('should return empty array', async () => {
        jest.clearAllMocks();
        repo.getAll = jest.fn(() => Promise.resolve([]));
        const loggedInUser = new LoggedInUser({ id: 'testId', email: 'test@example.com', role: 'sv' });
        const usecase = new GetAmos(repo);
        const res = await usecase.execute(loggedInUser);
        expect(res.length).toEqual(0);
    });

    it('should return all data when user is sv', async () => {
        repo.getAll = jest.fn(() => Promise.resolve([amo, amoNew]));
        const usecase = new GetAmos(repo);
        const loggedInUser = new LoggedInUser({ id: 'testId', email: 'test@example.com', role: 'sv' });
        const items = await usecase.execute(loggedInUser);
        expect(items.length).toEqual(2);
        expect(items[0].amoId).toEqual('amoId');
        expect(items[0].name).toEqual('testName');
        expect(items[0].email).toEqual('test@example.com');
        expect(items[1].amoId).toEqual('amoNewId');
        expect(items[1].name).toEqual('testNewName');
        expect(items[1].email).toEqual('testnew@example.com');
    });
});
describe('GetAmo', () => {
    const createdAt = moment('2021-01-10T20:09:00').toDate();
    const old = moment('2021-01-17T20:09:00').toDate();
    const now = moment('2021-03-01T00:00:00.000Z').toDate();
    const amo = Amo.create('amoId', { name: 'testName', email: 'test@example.com', isActive: true }, old);
    const amoNew = Amo.create('amoNewId', { name: 'testNewName', email: 'testnew@example.com', isActive: true }, now);
    const dateTimeRepo = { now: jest.fn(() => now) };
    const repo = {
        findById: jest.fn((amoId: string): Promise<Amo | undefined> => Promise.resolve(amo)),
        save: jest.fn((amo: Amo) => Promise.resolve()),
        getAll: jest.fn((): Promise<Amo[]> => Promise.resolve([])),
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw UnauthorizedError when user is anonymous', async () => {
        repo.getAll = jest.fn(() => Promise.resolve([amo, amoNew]));
        const usecase = new GetAmo(dateTimeRepo, repo);
        try {
            await usecase.execute(
                {
                    amoId: 'amoId',
                },
                undefined,
            );
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(e.message).toEqual('');
        }
    });
    it('should throw UnauthorizedError when user has no role', async () => {
        repo.getAll = jest.fn(() => Promise.resolve([amo, amoNew]));
        const usecase = new GetAmo(dateTimeRepo, repo);
        const loggedInUser = new LoggedInUser({ id: 'testId', email: 'test@example.com' });
        try {
            await usecase.execute(
                {
                    amoId: 'amoId',
                },
                loggedInUser,
            );
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(e.message).toEqual('');
        }
    });
    it('should throw NotFoundError when AmoId is not found', async () => {
        const loggedInUser = new LoggedInUser({ id: 'testId', email: 'test@example.com', role: 'sv' });
        repo.findById = jest.fn((id: string): Promise<Amo | undefined> => Promise.resolve(undefined));
        const usecase = new GetAmo(dateTimeRepo, repo);
        try {
            const respData = await usecase.execute({ amoId: 'amoid' }, loggedInUser);
            expect(respData).toEqual(undefined);
        } catch (e: any) {
            console.log(e);
        }
    });
    it('should return a record', async () => {
        const loggedInUser = new LoggedInUser({
            id: 'testId',
            email: 'test@example.com',
            role: 'sv',
        });
        repo.findById = jest.fn((id: string): Promise<Amo | undefined> => Promise.resolve(amoNew));
        const usecase = new GetAmo(dateTimeRepo, repo);
        try {
            const respData = await usecase.execute({ amoId: 'amoNewId' }, loggedInUser);
            expect(respData?.amoId).toBeDefined();
        } catch (e: any) {
            console.log(e);
        }
    });
});
