import { EmiPeopleCounterHeadListDTO } from '../../../../domains/dtos/EmiPeopleCounterHeadListDTO';
import { EmiPeopleCounterHead } from '@prisma/client';
import { EmiPeopleCounterHeadRepository } from '../../../../usecases/repositories/EmiPeopleCounterHead';
import { EmiPeopleCounterHead as DomainEmiPeopleCounterHead } from '../../../../domains/EmiPeopleCounterHead';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { EmiPeopleCounterHeadApiResponse } from '../../../../usecases/repositories/DxCoreRepository';
import * as uuid from 'uuid';
import { injectable } from 'inversify';

@injectable()
export class PostgresEmiPeopleCounterHeadRepository implements EmiPeopleCounterHeadRepository {
    public save = async (ex: DomainEmiPeopleCounterHead): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const emiPeopleCounterHead = this.transformFromDomain(ex);

        await prisma.emiPeopleCounterHead.upsert({
            where: { emiPeopleCounterHeadId: emiPeopleCounterHead.emiPeopleCounterHeadId },
            update: emiPeopleCounterHead,
            create: emiPeopleCounterHead,
        });
    };

    public getAll = async (startIndex: number = 1, endIndex: number = 20): Promise<EmiPeopleCounterHeadListDTO> => {
        const prisma = dbConnection.getInstance();
        const offset = startIndex - 1;
        const limit = endIndex - startIndex + 1;
        const emiPeopleCounterHeads = await prisma.emiPeopleCounterHead.findMany({
            skip: offset,
            take: Number(limit),
        });

        const emiPeopleCounterHeadCount: number = 0;
        return {
            total: emiPeopleCounterHeadCount,
            list: emiPeopleCounterHeads.map((item: any) => this.transformToDomain(item)),
        };
    };

    public findById = async (emiPeopleCounterHeadId: string): Promise<DomainEmiPeopleCounterHead | undefined> => {
        const prisma = dbConnection.getInstance();

        const exp = await prisma.emiPeopleCounterHead.findUnique({ where: { emiPeopleCounterHeadId } });
        if (!exp) return;
        return this.transformToDomain(exp);
    };

    public saveBulk = async (exArray: EmiPeopleCounterHeadApiResponse[]): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const emiPeopleCounterHeads = exArray.map((emiPeopleCounterHead) => {
            return {
                emiPeopleCounterHeadId: uuid.v4(),
                cameraId: emiPeopleCounterHead.camera_id,
                timestamp: emiPeopleCounterHead.timestamp,
                peopleCount: emiPeopleCounterHead.people_count,
                areaName: emiPeopleCounterHead.area_name,
                sendTrigger: emiPeopleCounterHead.send_trigger,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });

        await prisma.emiPeopleCounterHead.createMany({
            data: emiPeopleCounterHeads,
            skipDuplicates: true,
        });
    };

    private transformToDomain = (item: EmiPeopleCounterHead): DomainEmiPeopleCounterHead => {
        return new DomainEmiPeopleCounterHead({
            emiPeopleCounterHeadId: item.emiPeopleCounterHeadId,
            cameraId: item.cameraId,
            timestamp: item.timestamp,
            peopleCount: item.peopleCount,
            areaName: item.areaName,
            sendTrigger: item.sendTrigger,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        });
    };

    private transformFromDomain = (d: DomainEmiPeopleCounterHead): EmiPeopleCounterHead => {
        return {
            emiPeopleCounterHeadId: d.emiPeopleCounterHeadId,
            cameraId: d.cameraId,
            timestamp: d.timestamp,
            peopleCount: d.peopleCount,
            areaName: d.areaName,
            sendTrigger: d.sendTrigger,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
        };
    };
}
