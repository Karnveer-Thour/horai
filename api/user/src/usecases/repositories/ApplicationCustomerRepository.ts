import { ApplicationCustomerDetail } from '../../domains/customer/ApplicationCustomerDetail';

export interface ApplicationCustomerRepository {
    create(customer: ApplicationCustomerDetail): Promise<void>;
    createMany(customers: ApplicationCustomerDetail[]): Promise<void>;
    update(customer: ApplicationCustomerDetail): Promise<void>;
    softDeleteById(id: string): Promise<void>;
    deleteById(id: string): Promise<void>;
}
