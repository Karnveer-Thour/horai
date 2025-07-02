import { Smb } from '@prisma/client';
import { injectable } from 'inversify';
import { Smb as DomainSmb } from '../../../../domains/Smb';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { SmbRepository } from '../../../../usecases/repositories/SmbRepository';
import { transformSmbFromDomain, transformSmbToDomain } from './transformers/SmbTransformers';

@injectable()
export class PostgresSmbRepository implements SmbRepository {
    public save = async (ex: DomainSmb): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const smb = transformSmbFromDomain(ex);

        await prisma.smb.upsert({
            where: { smbId: smb.smbId },
            update: smb,
            create: smb,
        });
    };

    public getAll = async (): Promise<DomainSmb[]> => {
        const prisma = dbConnection.getInstance();

        const smb = await prisma.smb.findMany();
        return smb.map(transformSmbToDomain);
    };

    public findById = async (smbId: string): Promise<DomainSmb | undefined> => {
        const prisma = dbConnection.getInstance();

        const smb = await prisma.smb.findUnique({ where: { smbId } });
        if (!smb) return;

        return transformSmbToDomain(smb);
    };

    public getAllByAmoId = async (amoId: string): Promise<DomainSmb[]> => {
        const prisma = dbConnection.getInstance();
        let smb: Smb[];
        if (amoId) {
            smb = await prisma.smb.findMany({ where: { amoId: amoId } });
        } else {
            smb = await prisma.smb.findMany();
        }
        return smb.map(transformSmbToDomain);
    };

    public findByAmoId = async (amoId: string): Promise<DomainSmb | undefined> => {
        const prisma = dbConnection.getInstance();
        const smb = await prisma.smb.findFirst({ where: { amoId } });
        if (!smb) return;
        return transformSmbToDomain(smb);
    };
}
