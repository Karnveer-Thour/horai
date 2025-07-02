import { ActCastListDTO } from './../../../../domains/dtos/ActCastListDTO';
import { ActCast } from '@prisma/client';
import { ActCastRepository } from '../../../../usecases/repositories/ActCast';
import { ActCast as DomainActCast } from '../../../../domains/ActCast';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { ActCastApiResponse } from '../../../../usecases/repositories/DxCoreRepository';
import * as uuid from 'uuid';
import { injectable } from 'inversify';
@injectable()
export class PostgresActCastRepository implements ActCastRepository {
    public save = async (ex: DomainActCast): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const actCast = this.transformFromDomain(ex);

        await prisma.actCast.upsert({
            where: { actCastId: actCast.actCastId },
            update: actCast,
            create: actCast,
        });
    };

    public getAll = async (startIndex: number = 1, endIndex: number = 20): Promise<ActCastListDTO> => {
        const prisma = dbConnection.getInstance();
        const offset = startIndex - 1;
        const limit = endIndex - startIndex + 1;
        const actCasts = await prisma.actCast.findMany({
            skip: offset,
            take: Number(limit),
        });

        const actCastCount: number = 0;
        return {
            total: actCastCount,
            list: actCasts.map((item: any) => this.transformToDomain(item)),
        };
    };

    public findById = async (actCastId: string): Promise<DomainActCast | undefined> => {
        const prisma = dbConnection.getInstance();

        const exp = await prisma.actCast.findUnique({ where: { actCastId } });
        if (!exp) return;
        return this.transformToDomain(exp);
    };

    public saveBulk = async (exArray: ActCastApiResponse[]): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const actCasts = exArray.map((actCast) => {
            return {
                actCastId: uuid.v4(),
                deviceId: actCast.device_id,
                timestamp: actCast.timestamp,
                forward: actCast.forward,
                backward: actCast.backward,
                lineId: actCast.line_id,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });

        await prisma.actCast.createMany({
            data: actCasts,
            skipDuplicates: true,
        });
    };

    private transformToDomain = (item: ActCast): DomainActCast => {
        return new DomainActCast({
            actCastId: item.actCastId,
            deviceId: item.deviceId,
            timestamp: item.timestamp,
            lineId: item.lineId,
            forward: item.forward,
            backward: item.backward,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        });
    };

    private transformFromDomain = (d: DomainActCast): ActCast => {
        return {
            actCastId: d.actCastId,
            deviceId: d.deviceId,
            timestamp: d.timestamp,
            lineId: d.lineId,
            forward: d.forward,
            backward: d.backward,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
        };
    };
}
