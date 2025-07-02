export interface StripeCustomerRepository {
    createStripeCustomer(customerFirebaseId: string, email: string): Promise<any>;
    deleteStripeCustomer(customerFirebaseId: string): Promise<any>;
}
