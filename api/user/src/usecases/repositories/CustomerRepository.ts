import { Customer } from '../../domains/customer/Customer';
import { PaginationObj } from '../../domains/dtos/PageinatedListDTO';

export interface CustomerRepository {
    create(customer: Customer): Promise<void>;

    createMany(customers: Customer[]): Promise<void>;

    update(customer: Customer): Promise<void>;

    getAll(): Promise<Customer[]>;

    getCustomersWithConnectedDetailsByAppType(): Promise<Customer[]>;

    getAllByIds(ids: string[]): Promise<Customer[]>;

    findById(customerId: string): Promise<Customer | undefined>;

    findByCustomerFirebaseId(customerFirebaseId: string): Promise<Customer | undefined>;

    findByEmail(email: string): Promise<Customer | undefined>;

    softDeleteById(customerId: string): Promise<void>;

    getAllWithPagination(pagination: PaginationObj, searchText?: string): Promise<{ list: Customer[]; total: number }>;
}
