import { CustomerType, GenderType, ServiceType } from '../customer/CustomerEnum';
import { CustomerDTO } from './CustomerDTO';

export class ApplicationCustomerDTO extends CustomerDTO {
    firstName: string;
    lastName?: string;
    nickname?: string;
    dateOfBirth?: string;
    postCode?: string;
    gender?: GenderType;
    residenceArea?: string;
    acceptDirectMail?: boolean;
    emailAddress: string;
    language?: string;
    phoneNumber?: string;
    username?: string;
    city?: string;
    province?: string;
    customerType?: CustomerType;
    serviceType: ServiceType = ServiceType.Application;
    pronounceFirstName?: string;
    pronounceLastName?: string;
    bizUserId?: string;
    isBizUser?: boolean;
    connectedCustomerDetails: ConnectedCustomerDetails[] = [];

    constructor(
        input: Pick<
            ApplicationCustomerDTO,
            | 'firstName'
            | 'lastName'
            | 'nickname'
            | 'dateOfBirth'
            | 'postCode'
            | 'gender'
            | 'residenceArea'
            | 'acceptDirectMail'
            | 'emailAddress'
            | 'language'
            | 'phoneNumber'
            | 'customerId'
            | 'connectedFirebaseId'
            | 'email'
            | 'socialAccount'
            | 'username'
            | 'city'
            | 'province'
            | 'customerType'
            | 'pronounceFirstName'
            | 'pronounceLastName'
            | 'bizUserId'
            | 'isBizUser'
            | 'connectedCustomerDetails'
        >,
    ) {
        super(input);
        this.customerId = input.customerId;
        this.connectedFirebaseId = input.connectedFirebaseId;
        this.bizUserId = input.bizUserId ?? '';
        this.isBizUser = input.isBizUser;
        this.email = input.email;
        this.socialAccount = input.socialAccount;
        this.firstName = input.firstName;
        this.lastName = input.lastName;
        this.nickname = input.nickname;
        this.dateOfBirth = input.dateOfBirth;
        this.postCode = input.postCode;
        this.gender = input.gender;
        this.residenceArea = input.residenceArea;
        this.acceptDirectMail = input.acceptDirectMail;
        this.emailAddress = input.emailAddress;
        this.language = input.language;
        this.phoneNumber = input.phoneNumber;
        this.username = input.username;
        this.city = input.city;
        this.province = input.province;
        this.customerType = input.customerType;
        this.pronounceFirstName = input.pronounceFirstName;
        this.pronounceLastName = input.pronounceLastName;
        this.connectedCustomerDetails =
            input.connectedCustomerDetails?.map((detail) => ({
                ...detail,
                connectedCustomerPayload: JSON.parse(detail.connectedCustomerPayload),
            })) ?? [];
    }
}
interface ConnectedCustomerDetails {
    connectedCustomerDetailsId: string;
    customerId: string;
    appType: string;
    connectedCustomerPayload: any;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
