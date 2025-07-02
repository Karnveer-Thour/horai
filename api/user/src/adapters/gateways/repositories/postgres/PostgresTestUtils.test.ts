import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';

beforeAll(async () => {
    await dbConnection.initialize();
});
afterAll(async () => {
    await dbConnection.close();
});
export const deleteAllData = async () => {
    const prisma = await dbConnection.getInstance();

    await prisma.applicationCustomerDetail.deleteMany();
    await Promise.all(
        Reflect.ownKeys(prisma)
            .map((p) => p)
            .filter((p) => typeof p === 'string' && !p.startsWith('_'))
            .filter((p) => ['$parent', '$extends'].indexOf(p.toString()) == -1)
            .reverse()
            .map(async (t) => await (prisma as any)[t].deleteMany()),
    );
};
describe('PostgresTestUtil', () => {
    it('deleteAllData', async () => {
        await deleteAllData();
    });
});
