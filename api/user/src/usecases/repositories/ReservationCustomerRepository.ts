import { ReservationCustomerDetail } from '../../domains/customer/ReservationCustomerDetail';

export interface ReservationCustomerRepository {
    create(customer: ReservationCustomerDetail): Promise<void>;
    createMany(customers: ReservationCustomerDetail[]): Promise<void>;
    update(customer: ReservationCustomerDetail): Promise<void>;
    softDeleteById(id: string, now: Date): Promise<void>;
}
