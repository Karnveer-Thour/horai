import { ConnectedCustomerRepository } from '../../../../usecases/repositories/ConnectedCustomerRepository';
import { ConnectedCustomerDetails as DomainConnectedCustomerDetails } from '../../../../domains/customer/ConnectedCustomerDetails';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { injectable } from 'inversify';
import {
    transformConnectedCustomerFromDomain,
    transformConnectedCustomerToDomain,
} from './transformers/ConnectedCustomerTransformers';
import * as uuid from 'uuid';

@injectable()
export class PostgresConnectedCustomerRepository implements ConnectedCustomerRepository {
    public create = async (customer: DomainConnectedCustomerDetails): Promise<DomainConnectedCustomerDetails> => {
        const prisma = dbConnection.getInstance();
        const ConnectedCustomerDetailsId = uuid.v4();

        if (!customer.connectedCustomerDetailsId) {
            customer.connectedCustomerDetailsId = ConnectedCustomerDetailsId;
        }
        const prismaCustomer = transformConnectedCustomerFromDomain(customer);
        const createdCustomer = await prisma.connectedCustomerDetails.create({ data: prismaCustomer });
        return transformConnectedCustomerToDomain(createdCustomer);
    };

    public createMany = async (customers: DomainConnectedCustomerDetails[]): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const data = customers.map((customer) => ({
            ...transformConnectedCustomerFromDomain(customer),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        await prisma.connectedCustomerDetails.createMany({ data });
    };

    public update = async (customer: DomainConnectedCustomerDetails): Promise<DomainConnectedCustomerDetails> => {
        const prisma = dbConnection.getInstance();
        const prismaCustomer = transformConnectedCustomerFromDomain(customer);

        const updatedCustomer = await prisma.connectedCustomerDetails.update({
            where: { connectedCustomerDetailsId: customer.connectedCustomerDetailsId },
            data: prismaCustomer,
        });

        return transformConnectedCustomerToDomain(updatedCustomer);
    };

    public softDeleteById = async (id: string): Promise<void> => {
        const prisma = dbConnection.getInstance();
        await prisma.connectedCustomerDetails.update({
            where: { connectedCustomerDetailsId: id },
            data: { isActive: false },
        });
    };

    public deleteById = async (id: string): Promise<void> => {
        const prisma = dbConnection.getInstance();
        await prisma.connectedCustomerDetails.delete({
            where: { connectedCustomerDetailsId: id },
        });
    };

    public async delete(customer: DomainConnectedCustomerDetails): Promise<void> {
        const prisma = dbConnection.getInstance();
        await prisma.connectedCustomerDetails.delete({
            where: { connectedCustomerDetailsId: customer.connectedCustomerDetailsId },
        });
    }

    public getByCustomerId = async (
        customerId: string,
        appType: string,
    ): Promise<DomainConnectedCustomerDetails | null> => {
        const prisma = dbConnection.getInstance();
        const result = await prisma.connectedCustomerDetails.findFirst({
            where: {
                customerId,
                appType,
            },
        });

        if (result) {
            return transformConnectedCustomerToDomain(result);
        }
        return null;
    };
}
