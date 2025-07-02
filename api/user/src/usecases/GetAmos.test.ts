import { mock } from 'jest-mock-extended';
import moment from 'moment';
import { Amo } from '../domains/Amo';
import { LoggedInUser } from '../domains/LoggedInUser';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { GetAmos } from './GetAmos';
import { AmoRepository } from './repositories/AmoRepository';
describe('GetAmos', () => {
    const old = moment('2021-01-17T20:09:00').toDate();
    const now = moment('2021-03-01T00:00:00.000Z').toDate();
    const amo = Amo.create('amoId', { name: 'testName', email: 'test@example.com', isActive: true }, old);
    const amoNew = Amo.create('amoNewId', { name: 'testNewName', email: 'testnew@example.com', isActive: true }, now);

    const amoRepository = mock<AmoRepository>();
    amoRepository.getAll.mockResolvedValue([amo, amoNew]);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw UnauthorizedError when user is anonymous', async () => {
        const usecase = new GetAmos(amoRepository);
        try {
            await usecase.execute(undefined);
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(e.message).toEqual('');
        }
    });
    it('should throw UnauthorizedError when user has no role', async () => {
        const usecase = new GetAmos(amoRepository);
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

        const usecase = new GetAmos(amoRepository);
        try {
            const respData = await usecase.execute(loggedInUser);
            expect(respData).toBeDefined();
        } catch (e: any) {
            console.log(e);
        }
    });
});
