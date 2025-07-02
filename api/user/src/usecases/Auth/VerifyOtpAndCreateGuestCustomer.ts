import { UnauthorizedError } from '../errors/UnauthorizedError';
import { ApplicationCustomerRepository } from '../repositories/ApplicationCustomerRepository';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { DateTimeRepository } from '../repositories/DateTimeRepository';
import { verifyOTP } from '../utils/OTPUtils';

import * as uuid from 'uuid';
import { ApplicationCustomerDetail } from '../../domains/customer/ApplicationCustomerDetail';
import { Customer } from '../../domains/customer/Customer';
import { CustomerType, GenderType, SocialAccount } from '../../domains/customer/CustomerEnum';
import { ApplicationCustomerDTO } from '../../domains/dtos/ApplicationCustomerDetailDTO';
import { IllegalStateError } from '../errors/IllegalStateError';
import { FirebaseRepository } from '../repositories/FirebaseRepository';

import { EmailSender } from '../servicer/EmailSender';

type VerifyOtpAndCreateGuestCustomerBody = {
    email: string;
    otp: string;
    hash: string;
    firstName: string;
    lastName: string;
    password: string;
    emailAddress?: string;
    nickname?: string;
    gender?: string;
    dateOfBirth?: string;
    language?: string;
    customerType?: string;
    phoneNumber?: string;
    postCode?: string;
    residenceArea?: string;
    acceptDirectMail?: boolean;
    pronounceFirstName?: string;
    pronounceLastName?: string;
};

export class VerifyOtpAndCreateGuestCustomer {
    constructor(
        readonly customerRepository: CustomerRepository,
        readonly applicationCustomerRepository: ApplicationCustomerRepository,
        readonly dateTimeRepository: DateTimeRepository,
        readonly firebaseRepository: FirebaseRepository,
        readonly emailSender: EmailSender,
    ) {}

    public execute = async (input: VerifyOtpAndCreateGuestCustomerBody): Promise<ApplicationCustomerDTO> => {
        const { email, password, otp, hash } = input;

        const isVerifed = verifyOTP(email, otp, hash);
        if (!isVerifed) throw new UnauthorizedError(`OTP has been expired or Invalid`);

        const existingCustomer = await this.customerRepository.findByEmail(email);
        if (existingCustomer) {
            throw new IllegalStateError(
                `Customer already exists. Please login or reset your password using forgot password option.`,
            );
        }

        const customerId = uuid.v4();
        const now = this.dateTimeRepository.now();
        const firebaseId = await this.firebaseRepository.checkAndRegisterAuthUser(email, password);
        const customer = Customer.create(
            customerId,
            email,
            firebaseId,
            {
                socialAccount: SocialAccount.EMAIL,
            },
            now,
        );

        const appCustomerDetailsId = uuid.v4();
        const appCustomerDetails = ApplicationCustomerDetail.create(
            appCustomerDetailsId,
            customer.customerId,
            {
                ...input,
                emailAddress: input.emailAddress ?? '',
                gender: (input.gender as GenderType) ?? undefined,
                customerType: (input.customerType as CustomerType) || CustomerType.REGULAR,
            },
            now,
        );

        await this.customerRepository.create(customer);
        await this.applicationCustomerRepository.create(appCustomerDetails);
        await this.emailSender.send(email, `Account Created`, `Thank for registering with Horai App`);

        customer.applicationCustomerDetail = appCustomerDetails;

        return customer.toApplicationCustomerDTO();
    };
}
