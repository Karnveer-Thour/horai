import { GenderType, CustomerType } from './CustomerEnum';

export class ReservationCustomerDetail {
    reservationCustomerDetailId: string;
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
            ReservationCustomerDetail,
            | 'reservationCustomerDetailId'
            | 'customerId'
            | 'customerType'
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
            | 'isActive'
            | 'isDeleted'
            | 'createdAt'
            | 'updatedAt'
            | 'username'
            | 'city'
            | 'province'
            | 'pronounceFirstName'
            | 'pronounceLastName'
        > &
            ReservationCustomerDetailUpdatableField,
    ) {
        Object.assign(this, input);
        this.reservationCustomerDetailId = input.reservationCustomerDetailId;
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
        reservationCustomerDetailId: string,
        customerId: string,
        item: ReservationCustomerDetailUpdatableField,
        now: Date,
        customerType?: CustomerType,
    ): ReservationCustomerDetail =>
        new ReservationCustomerDetail({
            reservationCustomerDetailId,
            customerId,
            ...item,
            createdAt: now,
            updatedAt: now,
            customerType: customerType || CustomerType.REGULAR,
            gender: item.gender,
        });

    public update = (input: ReservationCustomerDetailUpdatableField, now: Date): ReservationCustomerDetail => {
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
        this.updatedAt = now;
        this.username = input.username;
        this.city = input.city;
        this.province = input.province;
        this.pronounceFirstName = input.pronounceFirstName;
        this.pronounceLastName = input.pronounceLastName;
        return this;
    };
}

export type ReservationCustomerDetailUpdatableField = Pick<
    ReservationCustomerDetail,
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
    | 'isActive'
    | 'isDeleted'
    | 'username'
    | 'city'
    | 'province'
    | 'pronounceFirstName'
    | 'pronounceLastName'
>;
