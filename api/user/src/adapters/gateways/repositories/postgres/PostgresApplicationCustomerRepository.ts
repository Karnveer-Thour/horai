import { ApplicationCustomerDetail as DomainApplicationCustomerDetail } from '../../../../domains/customer/ApplicationCustomerDetail';

import { injectable } from 'inversify';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { ApplicationCustomerRepository } from '../../../../usecases/repositories/ApplicationCustomerRepository';
import { transformApplicationCustomerFromDomain } from './transformers/CustomerTransformers';

@injectable()
export class PostgresApplicationCustomerRepository implements ApplicationCustomerRepository {
    public create = async (ex: DomainApplicationCustomerDetail): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const customerDetail = transformApplicationCustomerFromDomain(ex);
        await prisma.applicationCustomerDetail.create({ data: customerDetail });
    };

    public createMany = async (ex: DomainApplicationCustomerDetail[]): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const customerDetails = ex.map(transformApplicationCustomerFromDomain);
        await prisma.applicationCustomerDetail.createMany({ data: customerDetails });
    };

    public update = async (ex: DomainApplicationCustomerDetail): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const customerDetail = transformApplicationCustomerFromDomain(ex);
        await prisma.applicationCustomerDetail.update({
            data: customerDetail,
            where: {
                applicationCustomerDetailId: customerDetail.applicationCustomerDetailId,
            },
        });
    };

    public softDeleteById = async (id: string): Promise<void> => {
        const now = new Date();
        const prisma = dbConnection.getInstance();

        await prisma.applicationCustomerDetail.update({
            data: {
                isDeleted: true,
                updatedAt: now,
            },
            where: {
                applicationCustomerDetailId: id,
            },
        });
    };

    public deleteById = async (id: string): Promise<void> => {
        const prisma = dbConnection.getInstance();
        await prisma.applicationCustomerDetail.delete({
            where: {
                applicationCustomerDetailId: id,
            },
        });
    };
}
