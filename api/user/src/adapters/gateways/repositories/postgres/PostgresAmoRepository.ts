import { Amo } from '@prisma/client';
import { injectable } from 'inversify';
import { Amo as DomainAmo } from '../../../../domains/Amo';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { AmoRepository } from '../../../../usecases/repositories/AmoRepository';

@injectable()
export class PostgresAmoRepository implements AmoRepository {
    public save = async (ex: DomainAmo): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const amo = this.transformFromDomain(ex);

        await prisma.amo.upsert({
            where: { amoId: amo.amoId },
            update: amo,
            create: amo,
        });
    };

    public getAll = async (): Promise<DomainAmo[]> => {
        const prisma = dbConnection.getInstance();

        const exp = await prisma.amo.findMany({});
        return exp.map(this.transformToDomain);
    };

    public findById = async (amoId: string): Promise<DomainAmo | undefined> => {
        const prisma = dbConnection.getInstance();

        const exp = await prisma.amo.findUnique({ where: { amoId } });
        if (!exp) return;

        return this.transformToDomain(exp);
    };

    private transformToDomain = (item: Amo): DomainAmo =>
        new DomainAmo({
            amoId: item.amoId,
            name: item.name,
            email: item.email,
            isActive: item.isActive,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        });

    private transformFromDomain = (d: DomainAmo): Amo => {
        return {
            amoId: d.amoId,
            name: d.name,
            email: d.email,
            isActive: d.isActive,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
        };
    };
}
