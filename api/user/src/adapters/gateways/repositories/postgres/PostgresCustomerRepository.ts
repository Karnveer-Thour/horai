import { injectable } from 'inversify';
import { Customer as DomainCustomer } from '../../../../domains/customer/Customer';
import { PaginationObj } from '../../../../domains/dtos/PageinatedListDTO';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { CustomerRepository } from '../../../../usecases/repositories/CustomerRepository';
import { transformFromDomain, transformToDomain, transformCustomerToDomain } from './transformers/CustomerTransformers';

@injectable()
export class PostgresCustomerRepository implements CustomerRepository {
    public create = async (ex: DomainCustomer): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const customer = transformFromDomain(ex);

        await prisma.customer.create({ data: customer });
    };

    public createMany = async (ex: DomainCustomer[]): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const customers = ex.map((item) => transformFromDomain(item));

        await prisma.customer.createMany({ skipDuplicates: true, data: customers });
    };

    public update = async (ex: DomainCustomer): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const customer = transformFromDomain(ex);

        await prisma.customer.update({ data: customer, where: { customerId: ex.customerId } });
    };

    public getAllByIds = async (ids: string[]): Promise<DomainCustomer[]> => {
        const prisma = dbConnection.getInstance();
        const customers = await prisma.customer.findMany({
            where: {
                OR: [
                    {
                        customerId: {
                            in: ids,
                        },
                    },
                    {
                        connectedFirebaseId: {
                            in: ids,
                        },
                    },
                ],
            },
            include: {
                applicationCustomerDetail: true,
                reservationCustomerDetail: true,
                ConnectedCustomerDetails: true,
            },
        });

        return customers.map((customer) =>
            transformCustomerToDomain(
                customer,
                customer.applicationCustomerDetail,
                customer.reservationCustomerDetail,
                customer.ConnectedCustomerDetails,
            ),
        );
    };

    public getAll = async (): Promise<DomainCustomer[]> => {
        const prisma = dbConnection.getInstance();
        const customers = await prisma.customer.findMany({
            include: {
                applicationCustomerDetail: true,
                reservationCustomerDetail: true,
            },
        });

        return customers.map((customer) =>
            transformToDomain(customer, customer.applicationCustomerDetail, customer.reservationCustomerDetail),
        );
    };

    public getCustomersWithConnectedDetailsByAppType = async (): Promise<DomainCustomer[]> => {
        const prisma = dbConnection.getInstance();
        const customers = await prisma.customer.findMany({
            where: {
                isDeleted: false,
            },
            include: {
                ConnectedCustomerDetails: {
                    where: {
                        appType: 'dxCore', // filter based on appType dxCore
                    },
                },
            },
        });

        return customers.map((customer) =>
            transformCustomerToDomain(customer, null, null, customer.ConnectedCustomerDetails),
        );
    };

    public findById = async (customerId: string): Promise<DomainCustomer | undefined> => {
        const prisma = dbConnection.getInstance();
        const customer = await prisma.customer.findUnique({
            where: { customerId },
            include: {
                applicationCustomerDetail: true,
                reservationCustomerDetail: true,
                ConnectedCustomerDetails: true,
            },
        });
        if (!customer) return;

        return transformCustomerToDomain(
            customer,
            customer.applicationCustomerDetail,
            customer.reservationCustomerDetail,
            customer.ConnectedCustomerDetails,
        );
    };

    public findByCustomerFirebaseId = async (connectedFirebaseId: string): Promise<DomainCustomer | undefined> => {
        const prisma = dbConnection.getInstance();
        const customer = await prisma.customer.findUnique({ where: { connectedFirebaseId } });
        if (!customer) return;

        return transformToDomain(customer, null, null);
    };

    public findByEmail = async (email: string): Promise<DomainCustomer | undefined> => {
        const prisma = dbConnection.getInstance();
        const customer = await prisma.customer.findFirst({
            where: {
                email,
                isDeleted: false,
            },
            include: {
                applicationCustomerDetail: true,
                reservationCustomerDetail: true,
                ConnectedCustomerDetails: true,
            },
        });
        if (!customer) return;

        return transformCustomerToDomain(
            customer,
            customer.applicationCustomerDetail,
            customer.reservationCustomerDetail,
            customer.ConnectedCustomerDetails,
        );
    };

    public softDeleteById = async (customerId: string): Promise<void> => {
        const now = new Date();
        const prisma = dbConnection.getInstance();

        await prisma.customer.update({
            data: { isDeleted: true, updatedAt: now },
            where: { customerId },
        });
    };

    public getAllWithPagination = async (
        pagination: PaginationObj,
        searchText?: string,
    ): Promise<{ list: DomainCustomer[]; total: number }> => {
        let whereCondition: any = {
            applicationCustomerDetail: {
                isDeleted: false,
            },
        };

        if (searchText) {
            const splitName = searchText.split(' ');
            const firstName = splitName.length >= 2 ? splitName[0] : searchText;
            const lastName = splitName.length >= 2 ? splitName.splice(1).join(' ') : searchText;
            whereCondition = {
                ...whereCondition,
                OR: [
                    {
                        email: {
                            contains: searchText,
                            mode: 'insensitive',
                        },
                    },
                    {
                        applicationCustomerDetail: {
                            firstName: {
                                contains: firstName,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        applicationCustomerDetail: {
                            lastName: {
                                contains: lastName,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        applicationCustomerDetail: {
                            firstName: {
                                contains: lastName,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        applicationCustomerDetail: {
                            lastName: {
                                contains: firstName,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        applicationCustomerDetail: {
                            phoneNumber: {
                                contains: searchText,
                                mode: 'insensitive',
                            },
                        },
                    },
                ],
            };
        }

        const prisma = dbConnection.getInstance();
        const customers = await prisma.customer.findMany({
            include: {
                applicationCustomerDetail: true,
            },
            skip: (pagination.page - 1) * pagination.pageSize,
            take: Number(pagination.pageSize),
            orderBy: {
                updatedAt: 'desc',
            },
            where: whereCondition,
        });

        const total = await prisma.customer.count({
            where: whereCondition,
        });

        return {
            list: customers.map((item) => transformToDomain(item, item.applicationCustomerDetail, null)),
            total: total,
        };
    };
}
