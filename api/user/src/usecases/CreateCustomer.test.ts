import { mock } from 'jest-mock-extended';
import moment from 'moment';
import { LoggedInUser } from '../domains/LoggedInUser';
import { CreateCustomer } from './CreateCustomer';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { ApplicationCustomerRepository } from './repositories/ApplicationCustomerRepository';
import { CustomerRepository } from './repositories/CustomerRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { StripeCustomerRepository } from './repositories/StripeCustomerRepository';

describe('CREATE CUSTOMER', () => {
    const customer = {
        email: 'test@email.com',
        connectedFirebaseId: 'connectedFirebaseId',
        firstName: 'firstName',
        lastName: 'lastName',
        nickname: 'nickname',
        gender: 'MALE',
        dateOfBirth: '2022-01-01',
        language: 'ja',
        customerType: 'REGULAR',
        emailAddress: 'test2@email.com',
        phoneNumber: '1234567890',
        postCode: '11111',
        residenceArea: 'residenceArea',
        acceptDirectMail: true,
        serviceType: 'Application',
    };

    const now = moment().toDate();

    const dateTimeRepo = mock<DateTimeRepository>();
    dateTimeRepo.now.mockReturnValue(now);

    const customerRepository = mock<CustomerRepository>();
    customerRepository.create.mockResolvedValue(undefined);
    customerRepository.findByEmail.mockResolvedValue(undefined);

    const applicationCustomerRepository = mock<ApplicationCustomerRepository>();
    applicationCustomerRepository.create.mockResolvedValue(undefined);

    const stripeCustomerRepository = mock<StripeCustomerRepository>();
    stripeCustomerRepository.createStripeCustomer.mockResolvedValue(undefined);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create customer', async () => {
        const usecase = new CreateCustomer(
            dateTimeRepo,
            customerRepository,
            applicationCustomerRepository,
            stripeCustomerRepository,
        );
        const loggedInUser = new LoggedInUser({ id: 'testId', email: 'test@email.com' });
        try {
            const respData = await usecase.execute(
                {
                    ...customer,
                },
                loggedInUser,
            );
            expect(respData).toBeDefined();
        } catch (e: any) {
            console.log(e);
        }
    });

    it('smb should create user', async () => {
        const usecase = new CreateCustomer(
            dateTimeRepo,
            customerRepository,
            applicationCustomerRepository,
            stripeCustomerRepository,
        );
        const loggedInUser = new LoggedInUser({
            id: 'testId',
            email: 'test2@email.com',
            smbId: 'smbId',
            amoId: 'amoId',
            role: 'smb',
        });
        try {
            const respData = await usecase.execute(
                {
                    ...customer,
                },
                loggedInUser,
            );
            expect(respData).toBeDefined();
        } catch (e: any) {
            console.log(e);
        }
    });

    it('sv should create user', async () => {
        const usecase = new CreateCustomer(
            dateTimeRepo,
            customerRepository,
            applicationCustomerRepository,
            stripeCustomerRepository,
        );
        const loggedInUser = new LoggedInUser({ id: 'testId', email: 'test2@email.com', role: 'sv' });
        try {
            const respData = await usecase.execute(
                {
                    ...customer,
                },
                loggedInUser,
            );
            expect(respData).toBeDefined();
        } catch (e: any) {
            console.log(e);
        }
    });

    it('should throw unauthorised error if email does not match with logged in customer', async () => {
        const usecase = new CreateCustomer(
            dateTimeRepo,
            customerRepository,
            applicationCustomerRepository,
            stripeCustomerRepository,
        );
        const loggedInUser = new LoggedInUser({ id: 'testId', email: 'test2@email.com' });
        try {
            const respData = await usecase.execute(
                {
                    ...customer,
                },
                loggedInUser,
            );
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(e.message).toEqual('');
        }
    });
});
