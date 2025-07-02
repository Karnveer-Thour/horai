import { injectable } from 'inversify';
import { StripeCustomerRepository } from '../../../../usecases/repositories/StripeCustomerRepository';
import { RestClientMethodEnum, RestClientUtilities } from '../RestClientUltilities';
const paymentUrl = process.env.PAYMENT_SERVICE_URL || 'http://localhost:3000';

@injectable()
export class StripeCustomerRepositoryImpl implements StripeCustomerRepository {
    public createStripeCustomer = async (customerFirebaseId: string, email: string): Promise<void> => {
        const res: any = await RestClientUtilities.makeRestClientCallWithSecretHeader<any>(
            RestClientMethodEnum.POST,
            `${paymentUrl}/internalService/stripeCustomers`,
            {},
            { email, customerFirebaseId },
        );
        if (!res || (res && !res.data)) return;

        return res.data;
    };

    public deleteStripeCustomer = async (customerFirebaseId: string): Promise<void> => {
        const res: any = await RestClientUtilities.makeRestClientCallWithSecretHeader<any>(
            RestClientMethodEnum.DELETE,
            `${paymentUrl}/internalService/customerStripeInfo/${customerFirebaseId}`,
            {},
        );
        if (!res || (res && !res.data)) return;

        return res.data;
    };
}
