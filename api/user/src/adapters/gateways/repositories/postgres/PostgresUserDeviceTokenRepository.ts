import { UserDeviceToken } from '@prisma/client';
import { injectable } from 'inversify';
import { ServiceType } from '../../../../domains/customer/CustomerEnum';
import { UserDeviceToken as DomainUserDeviceToken } from '../../../../domains/UserDeviceToken';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { NotFoundError } from '../../../../usecases/errors/NotFoundError';
import { UserDeviceTokenRepository } from '../../../../usecases/repositories/UserDeviceTokenRepository';

@injectable()
export class PostgresUserDeviceTokenRepository implements UserDeviceTokenRepository {
    public create = async (ex: DomainUserDeviceToken): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const userDeviceToken = this.transformFromDomain(ex);

        await prisma.userDeviceToken.upsert({
            where: {
                email_deviceToken_serviceType: {
                    email: userDeviceToken.email,
                    deviceToken: userDeviceToken.deviceToken,
                    serviceType: userDeviceToken.serviceType,
                },
            },
            update: userDeviceToken,
            create: userDeviceToken,
        });
    };

    public findById = async (userDeviceTokenId: string): Promise<DomainUserDeviceToken | undefined> => {
        const prisma = dbConnection.getInstance();

        const exp = await prisma.userDeviceToken.findUnique({ where: { userDeviceTokenId } });
        if (!exp) return;

        return this.transformToDomain(exp);
    };

    public findByEmailAndServiceType = async (
        userEmail: string,
        serviceType: string,
    ): Promise<DomainUserDeviceToken[] | undefined> => {
        const prisma = dbConnection.getInstance();

        const res = await prisma.userDeviceToken.findMany({ where: { email: userEmail, serviceType: serviceType } });
        if (!res) return;
        return res.map((item) => this.transformToDomain(item));
    };

    public findByEmailsAndServiceType = async (
        userEmails: string[],
        serviceType: ServiceType,
    ): Promise<DomainUserDeviceToken[] | undefined> => {
        const prisma = dbConnection.getInstance();

        const res = await prisma.userDeviceToken.findMany({
            where: { email: { in: userEmails }, serviceType: serviceType },
        });
        if (!res) return;
        return res.map((item) => this.transformToDomain(item));
    };

    public deleteByDeviceToken = async (deviceToken: string): Promise<DomainUserDeviceToken> => {
        const prisma = dbConnection.getInstance();
        const userDeviceToken = await prisma.userDeviceToken.findFirst({ where: { deviceToken: deviceToken } });
        if (!userDeviceToken) {
            throw new NotFoundError(`UserDeviceToken not found for device token  ${deviceToken}`);
        }
        await prisma.userDeviceToken.delete({
            where: { userDeviceTokenId: userDeviceToken.userDeviceTokenId },
        });
        return this.transformToDomain(userDeviceToken);
    };

    private transformToDomain = (item: UserDeviceToken): DomainUserDeviceToken =>
        new DomainUserDeviceToken({
            userDeviceTokenId: item.userDeviceTokenId,
            deviceToken: item.deviceToken,
            email: item.email,
            serviceType: item.serviceType as ServiceType,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        });

    private transformFromDomain = (d: DomainUserDeviceToken): UserDeviceToken => {
        return {
            userDeviceTokenId: d.userDeviceTokenId,
            deviceToken: d.deviceToken,
            email: d.email,
            serviceType: d.serviceType as ServiceType,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
        };
    };
}
