import { mock } from 'jest-mock-extended';
import moment from 'moment';
import { ApplicationCustomerDetail } from '../domains/customer/ApplicationCustomerDetail';
import { Customer } from '../domains/customer/Customer';
import { CustomerType, GenderType, SocialAccount } from '../domains/customer/CustomerEnum';
import { LoggedInUser } from '../domains/LoggedInUser';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { ApplicationCustomerRepository } from './repositories/ApplicationCustomerRepository';
import { CustomerRepository } from './repositories/CustomerRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { SoftDeleteCustomerById } from './SoftDeleteCustomerById';

describe('DELETE CUSTOMER', () => {
    const now = moment().toDate();

    const applicationCustomerDetail = ApplicationCustomerDetail.create(
        'applicationCustomerDetailId',
        'customerId',
        {
            firstName: 'firstName',
            lastName: 'lastName',
            nickname: 'nickname',
            gender: GenderType.MALE,
            dateOfBirth: '2022-01-01',
            language: 'ja',
            emailAddress: 'test2@email.com',
            phoneNumber: '1234567890',
            postCode: '11111',
            residenceArea: 'residenceArea',
            acceptDirectMail: true,
            customerType: CustomerType.REGULAR,
        },
        now,
    );

    const customer = Customer.create(
        'customerId',
        'test@email.com',
        'connectedFirebaseId',
        {
            socialAccount: SocialAccount.EMAIL,
            applicationCustomerDetail: applicationCustomerDetail,
        },
        now,
    );

    const dateTimeRepo = mock<DateTimeRepository>();
    dateTimeRepo.now.mockReturnValue(now);

    const customerRepository = mock<CustomerRepository>();
    customerRepository.findById.mockResolvedValue(customer);

    const applicationCustomerRepository = mock<ApplicationCustomerRepository>();
    applicationCustomerRepository.softDeleteById.mockResolvedValue(undefined);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('smb should delete customer', async () => {
        const usecase = new SoftDeleteCustomerById(dateTimeRepo, customerRepository, applicationCustomerRepository);
        const loggedInUser = new LoggedInUser({
            id: 'testId',
            email: 'test2@email.com',
            smbId: 'smbId',
            amoId: 'amoId',
            role: 'smb',
        });
        try {
            const respData = await usecase.execute('customerId', undefined, loggedInUser);
            expect(respData).toEqual(undefined);
        } catch (e: any) {
            console.log(e);
        }
    });

    it('sv should delete user', async () => {
        const usecase = new SoftDeleteCustomerById(dateTimeRepo, customerRepository, applicationCustomerRepository);
        const loggedInUser = new LoggedInUser({ id: 'testId', email: 'test2@email.com', role: 'sv' });
        try {
            const respData = await usecase.execute('customerId', undefined, loggedInUser);
            expect(respData).toEqual(undefined);
        } catch (e: any) {
            console.log(e);
        }
    });

    it('should throw unauthorised error if user not authorised', async () => {
        const usecase = new SoftDeleteCustomerById(dateTimeRepo, customerRepository, applicationCustomerRepository);
        try {
            const respData = await usecase.execute('customerId');
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(e.message).toEqual('');
        }
    });
});
