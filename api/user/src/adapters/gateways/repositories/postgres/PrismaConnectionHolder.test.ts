import { PrismaConnectionHolder } from './PrismaConnectionHolder';

describe('PrismaConnectionHolder', () => {
    it('Throw error while initialize not called before getInstance.', () => {
        try {
            PrismaConnectionHolder.getInstance();
        } catch (error) {
            expect(() => {
                PrismaConnectionHolder.getInstance();
            }).toThrowError(
                'Please call PrismaConnectionHolder.initialize() once before calling this method if you can.',
            );
        }
    });
    it('Return undefined while prismaClient is not initialize.', async () => {
        const close = await PrismaConnectionHolder.close();
        expect(close).toBe(undefined);
    });
    it('Return undefine while no prisma client instance.', () => {
        PrismaConnectionHolder.initialize();
        PrismaConnectionHolder.close();
        const close = PrismaConnectionHolder.initialize();
        expect(close).toBe(undefined);
    });
});
