import { CongestioninsightListDTO } from '../../../../domains/dtos/CongestioninsightListDTO ';
import { Congestioninsight } from '@prisma/client';
import { CongestioninsightRepository } from '../../../../usecases/repositories/CongestioninsightRepository';
import { Congestioninsight as DomainCongestioninsight } from '../../../../domains/Congestioninsight';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { CongestioninsightResponse } from '../../../../usecases/repositories/DxCoreRepository';
import * as uuid from 'uuid';
import { injectable } from 'inversify';

@injectable()
export class PostgresCongestioninsightRepository implements CongestioninsightRepository {
    public save = async (ex: DomainCongestioninsight): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const Congestioninsight = this.transformFromDomain(ex);

        await prisma.congestioninsight.upsert({
            where: { congestioninsightId: Congestioninsight.congestioninsightId },
            update: Congestioninsight,
            create: Congestioninsight,
        });
    };

    public getAll = async (startIndex: number = 1, endIndex: number = 20): Promise<CongestioninsightListDTO> => {
        const prisma = dbConnection.getInstance();
        const offset = startIndex - 1;
        const limit = endIndex - startIndex + 1;
        const emiPeopleCounterHeadCrosss = await prisma.congestioninsight.findMany({
            skip: offset,
            take: Number(limit),
        });

        const congestioninsight: number = 0;
        return {
            total: congestioninsight,
            list: emiPeopleCounterHeadCrosss.map((item: any) => this.transformToDomain(item)),
        };
    };

    public findById = async (congestioninsightId: string): Promise<DomainCongestioninsight | undefined> => {
        const prisma = dbConnection.getInstance();

        const exp = await prisma.congestioninsight.findUnique({ where: { congestioninsightId } });
        if (!exp) return;
        return this.transformToDomain(exp);
    };

    public saveBulk = async (exArray: CongestioninsightResponse[]): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const emiPeopleCounterHeadCrosses = exArray.map((emiPeopleCounterHeadCross) => {
            return {
                congestioninsightId: uuid.v4(),
                timestamp: emiPeopleCounterHeadCross.timestamp,
                deviceId: emiPeopleCounterHeadCross.device_id,
                count: emiPeopleCounterHeadCross.count,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });

        await prisma.congestioninsight.createMany({
            data: emiPeopleCounterHeadCrosses,
            skipDuplicates: true,
        });
    };

    private transformToDomain = (item: Congestioninsight): DomainCongestioninsight => {
        return new DomainCongestioninsight({
            uuid: item.congestioninsightId,
            congestioninsightId: item.congestioninsightId,
            timestamp: item.timestamp,
            device_id: item.deviceId,
            count: item.count,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        });
    };

    private transformFromDomain = (d: DomainCongestioninsight): Congestioninsight => {
        return {
            congestioninsightId: d.congestioninsightId,
            timestamp: d.timestamp,
            count: d.count,
            deviceId: d.device_id,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
        };
    };
}
