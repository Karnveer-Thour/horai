import { BuilMiraiDevice } from '@prisma/client';
import { BuilMiraiDeviceRepository } from '../../../../usecases/repositories/BuilMiraiDeviceRepository';
import { BuilMiraiDevice as DomainBuilMirai } from '../../../../domains/BuilMiraiDevice';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { injectable } from 'inversify';

@injectable()
export class PostgresBuilMiraiDeviceRepository implements BuilMiraiDeviceRepository {
    public save = async (ex: DomainBuilMirai): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const builMiraiDevice = this.transformFromDomain(ex);

        await prisma.builMiraiDevice.upsert({
            where: { builMiraiDeviceId: builMiraiDevice.builMiraiDeviceId },
            update: builMiraiDevice,
            create: builMiraiDevice,
        });
    };

    public saveBulk = async (data: DomainBuilMirai[]): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const builMiraiDevices = data.map((e) => this.transformFromDomain(e));

        await prisma.builMiraiDevice.createMany({
            data: builMiraiDevices,
            skipDuplicates: true,
        });
    };

    public findById = async (builMiraiDeviceId: string): Promise<DomainBuilMirai | undefined> => {
        const prisma = dbConnection.getInstance();

        const exp = await prisma.builMiraiDevice.findUnique({ where: { builMiraiDeviceId: builMiraiDeviceId } });
        if (!exp) return;
        return this.transformToDomain(exp);
    };

    public getAll = async (): Promise<DomainBuilMirai[]> => {
        const prisma = dbConnection.getInstance();
        const emiPeopleCounterHeadCrosss = await prisma.builMiraiDevice.findMany({});

        return emiPeopleCounterHeadCrosss.map((item: any) => this.transformToDomain(item));
    };

    private transformToDomain = (item: BuilMiraiDevice): DomainBuilMirai => {
        return new DomainBuilMirai({
            builMiraiDeviceId: item.builMiraiDeviceId,
            deviceId: item.deviceId,
            messageId: item.messageId,
            deviceType: item.deviceType,
            dataType: item.dataType,
            messageType: item.messageType,
            value: item.value,
            unit: item.unit,
            errorFlg: item.errorFlg,
            eventDate: item.eventDate,
            dataReceiveDate: item.dataReceiveDate,
            createdon: item.createdon,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        });
    };

    private transformFromDomain = (d: DomainBuilMirai): BuilMiraiDevice => {
        return {
            builMiraiDeviceId: d.builMiraiDeviceId,
            deviceId: d.deviceId,
            messageId: d.messageId,
            deviceType: d.deviceType,
            dataType: d.dataType,
            messageType: d.messageType,
            value: d.value,
            unit: d.unit,
            errorFlg: d.errorFlg,
            eventDate: d.eventDate,
            dataReceiveDate: d.dataReceiveDate,
            createdon: d.createdon,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
        };
    };
}
