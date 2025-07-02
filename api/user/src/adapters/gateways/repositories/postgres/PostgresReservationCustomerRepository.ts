import { ReservationCustomerDetail as DomainReservationCustomerDetail } from '../../../../domains/customer/ReservationCustomerDetail';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { injectable } from 'inversify';
import { transformReservationCustomerFromDomain } from './transformers/CustomerTransformers';
import { ReservationCustomerRepository } from '../../../../usecases/repositories/ReservationCustomerRepository';

@injectable()
export class PostgresReservationCustomerRepository implements ReservationCustomerRepository {
    public create = async (ex: DomainReservationCustomerDetail): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const customerDetail = transformReservationCustomerFromDomain(ex);
        await prisma.reservationCustomerDetail.create({ data: customerDetail });
    };

    public createMany = async (ex: DomainReservationCustomerDetail[]): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const customerDetails = ex.map(transformReservationCustomerFromDomain);
        await prisma.reservationCustomerDetail.createMany({ data: customerDetails });
    };

    public update = async (ex: DomainReservationCustomerDetail): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const customerDetail = transformReservationCustomerFromDomain(ex);
        await prisma.reservationCustomerDetail.update({
            data: customerDetail,
            where: {
                reservationCustomerDetailId: customerDetail.reservationCustomerDetailId,
            },
        });
    };

    public softDeleteById = async (id: string, now: Date): Promise<void> => {
        const prisma = dbConnection.getInstance();
        await prisma.reservationCustomerDetail.update({
            data: {
                isDeleted: true,
                updatedAt: now,
            },
            where: {
                reservationCustomerDetailId: id,
            },
        });
    };
}
