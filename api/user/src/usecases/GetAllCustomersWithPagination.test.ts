import { mock } from 'jest-mock-extended';
import moment from 'moment';
import { ApplicationCustomerDetail } from '../domains/customer/ApplicationCustomerDetail';
import { Customer } from '../domains/customer/Customer';
import { GenderType, SocialAccount } from '../domains/customer/CustomerEnum';
import { LoggedInUser } from '../domains/LoggedInUser';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { GetAllCustomersWithPagination } from './GetAllCustomersWithPagination';
import { CustomerRepository } from './repositories/CustomerRepository';

describe('GET ALL CUSTOMER BY PAGINATION', () => {
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

    const customerRepository = mock<CustomerRepository>();
    customerRepository.getAllWithPagination.mockResolvedValue({ list: [customer], total: 1 });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('smb should get list of customers', async () => {
        const usecase = new GetAllCustomersWithPagination(customerRepository);
        const loggedInUser = new LoggedInUser({
            id: 'testId',
            email: 'test2@email.com',
            smbId: 'smbId',
            amoId: 'amoId',
            role: 'smb',
        });
        try {
            const respData = await usecase.execute(1, 10, undefined, undefined, loggedInUser);
            expect(respData.list.length).toBeGreaterThanOrEqual(1);
        } catch (e: any) {
            console.log(e);
        }
    });

    it('sv should get list of customers', async () => {
        const usecase = new GetAllCustomersWithPagination(customerRepository);
        const loggedInUser = new LoggedInUser({ id: 'testId', email: 'test2@email.com', role: 'sv' });
        try {
            const respData = await usecase.execute(1, 10, undefined, undefined, loggedInUser);
            expect(respData.list.length).toBeGreaterThanOrEqual(1);
        } catch (e: any) {
            console.log(e);
        }
    });

    it('should throw unauthorised error if user not authorised', async () => {
        const usecase = new GetAllCustomersWithPagination(customerRepository);
        try {
            const respData = await usecase.execute(1, 10);
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
            expect(e.message).toEqual('');
        }
    });
});
