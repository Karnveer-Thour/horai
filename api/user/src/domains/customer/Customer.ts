import { ApplicationCustomerDTO } from '../dtos/ApplicationCustomerDetailDTO';
import { ReservationCustomerDTO } from '../dtos/ReservationCustomerDetailDTO';
import { ApplicationCustomerDetail } from './ApplicationCustomerDetail';
import { SocialAccount } from './CustomerEnum';
import { ReservationCustomerDetail } from './ReservationCustomerDetail';
import { ConnectedCustomerDetails } from './ConnectedCustomerDetails';

export class Customer {
    customerId: string;
    connectedFirebaseId: string;
    email: string;
    socialAccount: SocialAccount = SocialAccount.EMAIL;
    applicationCustomerDetail?: ApplicationCustomerDetail;
    reservationCustomerDetail?: ReservationCustomerDetail;
    connectedCustomerDetails?: ConnectedCustomerDetails[];
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    bizUserId?: string;
    bizPayload?: string;
    isBizUser?: boolean;

    constructor(
        input: Pick<
            Customer,
            | 'customerId'
            | 'connectedFirebaseId'
            | 'bizUserId'
            | 'isBizUser'
            | 'email'
            | 'socialAccount'
            | 'applicationCustomerDetail'
            | 'reservationCustomerDetail'
            | 'createdAt'
            | 'updatedAt'
            | 'isDeleted'
            | 'connectedCustomerDetails'
        > &
            CustomerUpdatableField,
    ) {
        Object.assign(this, input);
        this.customerId = input.customerId;
        this.connectedFirebaseId = input.connectedFirebaseId;
        this.bizUserId = input.bizUserId ?? '';
        this.isBizUser = input.isBizUser;
        this.email = input.email;
        this.socialAccount = input.socialAccount;
        this.applicationCustomerDetail = input.applicationCustomerDetail;
        this.reservationCustomerDetail = input.reservationCustomerDetail;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
        this.isDeleted = input.isDeleted;
        this.connectedCustomerDetails = input.connectedCustomerDetails;
    }

    public static create = (
        customerId: string,
        email: string,
        connectedFirebaseId: string,
        item: CustomerUpdatableField,
        now: Date,
    ): Customer =>
        new Customer({
            customerId,
            email,
            connectedFirebaseId,
            ...item,
            createdAt: now,
            updatedAt: now,
            applicationCustomerDetail: item.applicationCustomerDetail,
            reservationCustomerDetail: item.reservationCustomerDetail,
            isDeleted: false,
        });

    public update = (item: CustomerUpdatableField, now: Date): Customer => {
        this.socialAccount = item.socialAccount;
        this.updatedAt = now;
        return this;
    };

    public softDelete = (): Customer => {
        this.isDeleted = true;
        return this;
    };
    public updateBizUser = (): Customer => {
        this.bizUserId = '';
        this.isBizUser = false;
        this.bizPayload = '';
        return this;
    };

    public toApplicationCustomerDTO = (): ApplicationCustomerDTO => {
        return new ApplicationCustomerDTO({
            customerId: this.customerId,
            connectedFirebaseId: this.connectedFirebaseId,
            email: this.email,
            socialAccount: this.socialAccount,
            bizUserId: this.bizUserId ? this.bizUserId : '',
            isBizUser: this.isBizUser ? this.isBizUser : false,
            firstName: this.applicationCustomerDetail ? this.applicationCustomerDetail.firstName : '',
            lastName: this.applicationCustomerDetail ? this.applicationCustomerDetail.lastName : '',
            nickname: this.applicationCustomerDetail ? this.applicationCustomerDetail.nickname : '',
            dateOfBirth: this.applicationCustomerDetail ? this.applicationCustomerDetail.dateOfBirth : '',
            postCode: this.applicationCustomerDetail ? this.applicationCustomerDetail.postCode : '',
            gender: this.applicationCustomerDetail ? this.applicationCustomerDetail.gender : undefined,
            residenceArea: this.applicationCustomerDetail ? this.applicationCustomerDetail.residenceArea : '',
            acceptDirectMail: this.applicationCustomerDetail ? this.applicationCustomerDetail.acceptDirectMail : false,
            emailAddress: this.applicationCustomerDetail ? this.applicationCustomerDetail.emailAddress : '',
            language: this.applicationCustomerDetail ? this.applicationCustomerDetail.language : 'ja',
            phoneNumber: this.applicationCustomerDetail ? this.applicationCustomerDetail.phoneNumber : '',
            username: this.applicationCustomerDetail ? this.applicationCustomerDetail.username : '',
            city: this.applicationCustomerDetail ? this.applicationCustomerDetail.city : '',
            province: this.applicationCustomerDetail ? this.applicationCustomerDetail.province : '',
            customerType: this.applicationCustomerDetail ? this.applicationCustomerDetail.customerType : undefined,
            pronounceFirstName: this.applicationCustomerDetail
                ? this.applicationCustomerDetail.pronounceFirstName
                : undefined,
            pronounceLastName: this.applicationCustomerDetail
                ? this.applicationCustomerDetail.pronounceLastName
                : undefined,
            connectedCustomerDetails: this.connectedCustomerDetails || [],
        });
    };
    public toReservationCustomerDTO = (): ReservationCustomerDTO => {
        return new ReservationCustomerDTO({
            customerId: this.customerId,
            connectedFirebaseId: this.connectedFirebaseId,
            email: this.email,
            socialAccount: this.socialAccount,
            bizUserId: this.bizUserId ? this.bizUserId : '',
            isBizUser: this.isBizUser ? this.isBizUser : false,
            firstName: this.reservationCustomerDetail ? this.reservationCustomerDetail.firstName : '',
            lastName: this.reservationCustomerDetail ? this.reservationCustomerDetail.lastName : '',
            nickname: this.reservationCustomerDetail ? this.reservationCustomerDetail.nickname : '',
            dateOfBirth: this.reservationCustomerDetail ? this.reservationCustomerDetail.dateOfBirth : '',
            postCode: this.reservationCustomerDetail ? this.reservationCustomerDetail.postCode : '',
            gender: this.reservationCustomerDetail ? this.reservationCustomerDetail.gender : undefined,
            residenceArea: this.reservationCustomerDetail ? this.reservationCustomerDetail.residenceArea : '',
            acceptDirectMail: this.reservationCustomerDetail ? this.reservationCustomerDetail.acceptDirectMail : false,
            emailAddress: this.reservationCustomerDetail ? this.reservationCustomerDetail.emailAddress : '',
            language: this.reservationCustomerDetail ? this.reservationCustomerDetail.language : 'ja',
            phoneNumber: this.reservationCustomerDetail ? this.reservationCustomerDetail.phoneNumber : '',
            username: this.reservationCustomerDetail ? this.reservationCustomerDetail.username : '',
            city: this.reservationCustomerDetail ? this.reservationCustomerDetail.city : '',
            province: this.reservationCustomerDetail ? this.reservationCustomerDetail.province : '',
            customerType: this.reservationCustomerDetail ? this.reservationCustomerDetail.customerType : undefined,
            pronounceFirstName: this.reservationCustomerDetail
                ? this.reservationCustomerDetail.pronounceFirstName
                : undefined,
            pronounceLastName: this.reservationCustomerDetail
                ? this.reservationCustomerDetail.pronounceLastName
                : undefined,
            connectedCustomerDetails: this.connectedCustomerDetails || [],
        });
    };

    public addBizUserIdByCustomerId = (
        customerId: string,
        bizUserDetails: { bizUserId: string; bizPayload: string; isBizUser: boolean },
        now: Date,
    ): Customer | undefined => {
        if (this.customerId === customerId) {
            this.bizUserId = bizUserDetails.bizUserId;
            this.isBizUser = bizUserDetails.isBizUser;
            this.bizPayload = bizUserDetails.bizPayload;
            this.updatedAt = now;

            return this;
        }

        return undefined;
    };
}

export type CustomerUpdatableField = Pick<Customer, 'socialAccount'> & {
    applicationCustomerDetail?: ApplicationCustomerDetail;
    reservationCustomerDetail?: ReservationCustomerDetail;
    socialAccount: SocialAccount;
};
