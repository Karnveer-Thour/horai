import { EmiPeopleCounterHeadCrossListDTO } from '../../../../domains/dtos/EmiPeopleCounterHeadCrossListDTO';
import { EmiPeopleCounterHeadCross } from '@prisma/client';
import { EmiPeopleCounterHeadCrossRepository } from '../../../../usecases/repositories/EmiPeopleCounterHeadCross';
import { EmiPeopleCounterHeadCross as DomainEmiPeopleCounterHeadCross } from '../../../../domains/EmiPeopleCounterHeadCross';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { EmiPeopleCounterHeadCrossApiResponse } from '../../../../usecases/repositories/DxCoreRepository';
import * as uuid from 'uuid';
import { injectable } from 'inversify';

@injectable()
export class PostgresEmiPeopleCounterHeadCrossRepository implements EmiPeopleCounterHeadCrossRepository {
    public save = async (ex: DomainEmiPeopleCounterHeadCross): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const emiPeopleCounterHeadCross = this.transformFromDomain(ex);

        await prisma.emiPeopleCounterHeadCross.upsert({
            where: { emiPeopleCounterHeadCrossId: emiPeopleCounterHeadCross.emiPeopleCounterHeadCrossId },
            update: emiPeopleCounterHeadCross,
            create: emiPeopleCounterHeadCross,
        });
    };

    public getAll = async (
        startIndex: number = 1,
        endIndex: number = 20,
    ): Promise<EmiPeopleCounterHeadCrossListDTO> => {
        const prisma = dbConnection.getInstance();
        const offset = startIndex - 1;
        const limit = endIndex - startIndex + 1;
        const emiPeopleCounterHeadCrosss = await prisma.emiPeopleCounterHeadCross.findMany({
            skip: offset,
            take: Number(limit),
        });

        const emiPeopleCounterHeadCrossCount: number = 0;
        return {
            total: emiPeopleCounterHeadCrossCount,
            list: emiPeopleCounterHeadCrosss.map((item: any) => this.transformToDomain(item)),
        };
    };

    public findById = async (
        emiPeopleCounterHeadCrossId: string,
    ): Promise<DomainEmiPeopleCounterHeadCross | undefined> => {
        const prisma = dbConnection.getInstance();

        const exp = await prisma.emiPeopleCounterHeadCross.findUnique({ where: { emiPeopleCounterHeadCrossId } });
        if (!exp) return;
        return this.transformToDomain(exp);
    };

    public saveBulk = async (exArray: EmiPeopleCounterHeadCrossApiResponse[]): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const emiPeopleCounterHeadCrosses = exArray.map((emiPeopleCounterHeadCross) => {
            return {
                emiPeopleCounterHeadCrossId: uuid.v4(),
                uuid: emiPeopleCounterHeadCross.uuid,
                timestamp: emiPeopleCounterHeadCross.timestamp,
                timestampFrom: emiPeopleCounterHeadCross.timestamp_from,
                lineId: emiPeopleCounterHeadCross.line_id,
                intoInside: emiPeopleCounterHeadCross.into_inside,
                count: emiPeopleCounterHeadCross.count,
                elapsedSeconds: emiPeopleCounterHeadCross.elapsed_seconds,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });

        await prisma.emiPeopleCounterHeadCross.createMany({
            data: emiPeopleCounterHeadCrosses,
            skipDuplicates: true,
        });
    };

    private transformToDomain = (item: EmiPeopleCounterHeadCross): DomainEmiPeopleCounterHeadCross => {
        return new DomainEmiPeopleCounterHeadCross({
            emiPeopleCounterHeadCrossId: item.emiPeopleCounterHeadCrossId,
            uuid: item.uuid,
            timestamp: item.timestamp,
            timestampFrom: item.timestampFrom,
            lineId: item.lineId,
            intoInside: item.intoInside,
            count: item.count,
            elapsedSeconds: item.elapsedSeconds,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        });
    };

    private transformFromDomain = (d: DomainEmiPeopleCounterHeadCross): EmiPeopleCounterHeadCross => {
        return {
            emiPeopleCounterHeadCrossId: d.emiPeopleCounterHeadCrossId,
            uuid: d.uuid,
            timestamp: d.timestamp,
            timestampFrom: d.timestampFrom,
            lineId: d.lineId,
            intoInside: d.intoInside,
            count: d.count,
            elapsedSeconds: d.elapsedSeconds,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
        };
    };
}
