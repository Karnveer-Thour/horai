import { ConnectedCustomerDetails } from '../../domains/customer/ConnectedCustomerDetails';

export interface ConnectedCustomerRepository {
    create(customer: ConnectedCustomerDetails): Promise<ConnectedCustomerDetails | null>;
    createMany(customers: ConnectedCustomerDetails[]): Promise<void>;
    update(customer: ConnectedCustomerDetails): Promise<ConnectedCustomerDetails | null>;
    softDeleteById(id: string): Promise<void>;
    deleteById(id: string): Promise<void>;
    getByCustomerId(customerId: string, appType: string): Promise<ConnectedCustomerDetails | null>;
    delete(customer: ConnectedCustomerDetails): Promise<void>;
}
