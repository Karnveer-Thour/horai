import { CustomerType, GenderType } from './CustomerEnum';

export class ApplicationCustomerDetail {
    applicationCustomerDetailId: string;
    customerId: string;
    customerType?: CustomerType;
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
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    username?: string;
    city?: string;
    province?: string;
    pronounceFirstName?: string;
    pronounceLastName?: string;

    constructor(
        input: Pick<
            ApplicationCustomerDetail,
            | 'applicationCustomerDetailId'
            | 'customerId'
            | 'customerType'
            | 'dateOfBirth'
            | 'postCode'
            | 'gender'
            | 'residenceArea'
            | 'acceptDirectMail'
            | 'emailAddress'
            | 'createdAt'
            | 'updatedAt'
            | 'username'
            | 'city'
            | 'province'
            | 'pronounceFirstName'
            | 'pronounceLastName'
            | 'isActive'
            | 'isDeleted'
        > &
            ApplicationCustomerDetailUpdatableField,
    ) {
        Object.assign(this, input);
        this.applicationCustomerDetailId = input.applicationCustomerDetailId;
        this.customerId = input.customerId;
        this.customerType = input.customerType;
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
        this.isActive = input.isActive;
        this.isDeleted = input.isDeleted;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
        this.username = input.username;
        this.city = input.city;
        this.province = input.province;
        this.pronounceFirstName = input.pronounceFirstName;
        this.pronounceLastName = input.pronounceLastName;
    }

    public static create = (
        applicationCustomerDetailId: string,
        customerId: string,
        item: ApplicationCustomerDetailUpdatableField,
        now: Date,
    ): ApplicationCustomerDetail =>
        new ApplicationCustomerDetail({
            applicationCustomerDetailId,
            customerId,
            ...item,
            createdAt: now,
            updatedAt: now,
            gender: item.gender,
            isActive: true,
            isDeleted: false,
        });

    public update = (input: ApplicationCustomerDetailUpdatableField, now: Date): ApplicationCustomerDetail => {
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
        this.customerType = input.customerType;
        this.updatedAt = now;
        this.username = input.username;
        this.city = input.city;
        this.province = input.province;
        this.pronounceFirstName = input.pronounceFirstName;
        this.pronounceLastName = input.pronounceLastName;
        return this;
    };
}

export type ApplicationCustomerDetailUpdatableField = Pick<
    ApplicationCustomerDetail,
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
    | 'customerType'
    | 'username'
    | 'city'
    | 'province'
    | 'pronounceFirstName'
    | 'pronounceLastName'
>;
