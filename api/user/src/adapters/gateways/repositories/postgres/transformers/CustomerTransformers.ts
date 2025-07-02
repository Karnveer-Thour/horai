import {
    ApplicationCustomerDetail,
    ConnectedCustomerDetails,
    Customer,
    ReservationCustomerDetail,
} from '@prisma/client';
import { ApplicationCustomerDetail as DomainApplicationCustomerDetail } from '../../../../../domains/customer/ApplicationCustomerDetail';
import { Customer as DomainCustomer } from '../../../../../domains/customer/Customer';
import { CustomerType, GenderType, SocialAccount } from '../../../../../domains/customer/CustomerEnum';
import { ReservationCustomerDetail as DomainReservationCustomerDetail } from '../../../../../domains/customer/ReservationCustomerDetail';
import { ConnectedCustomerDetails as DomainConnectedCustomerDetails } from '../../../../../domains/customer/ConnectedCustomerDetails';

export const transformApplicationCustomerToDomain = (
    item: ApplicationCustomerDetail,
): DomainApplicationCustomerDetail =>
    new DomainApplicationCustomerDetail({
        applicationCustomerDetailId: item.applicationCustomerDetailId,
        customerId: item.customerId,
        customerType: (item.customerType as CustomerType) || undefined,
        firstName: item.firstName,
        lastName: item.lastName || '',
        nickname: item.nickname || '',
        dateOfBirth: item.dateOfBirth || '',
        postCode: item.postCode || '',
        gender: (item.gender as GenderType) || undefined,
        residenceArea: item.residenceArea || '',
        acceptDirectMail: item.acceptDirectMail || false,
        emailAddress: item.emailAddress || '',
        language: item.language || 'ja',
        phoneNumber: item.phoneNumber || '',
        isActive: item.isActive,
        isDeleted: item.isDeleted,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        username: item.username || undefined,
        city: item.city || undefined,
        province: item.province || undefined,
        pronounceFirstName: item.pronounceFirstName || '',
        pronounceLastName: item.pronounceLastName || '',
    });

export const transformApplicationCustomerFromDomain = (
    d: DomainApplicationCustomerDetail,
): ApplicationCustomerDetail => {
    return {
        applicationCustomerDetailId: d.applicationCustomerDetailId,
        customerId: d.customerId,
        customerType: (d.customerType as CustomerType) || null,
        firstName: d.firstName,
        lastName: d.lastName || '',
        nickname: d.nickname || '',
        dateOfBirth: d.dateOfBirth || '',
        postCode: d.postCode || '',
        gender: (d.gender as GenderType) || null,
        residenceArea: d.residenceArea || '',
        acceptDirectMail: d.acceptDirectMail || false,
        emailAddress: d.emailAddress || '',
        language: d.language || 'ja',
        phoneNumber: d.phoneNumber || null,
        isActive: d.isActive,
        isDeleted: d.isDeleted,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
        username: d.username || null,
        city: d.city || null,
        province: d.province || null,
        pronounceFirstName: d.pronounceFirstName || '',
        pronounceLastName: d.pronounceLastName || '',
    };
};

export const transformConnectedCustomerDetailToDomain = (
    item: ConnectedCustomerDetails,
): DomainConnectedCustomerDetails => {
    return new DomainConnectedCustomerDetails({
        connectedCustomerDetailsId: item.connectedCustomerDetailsId,
        customerId: item.customerId,
        appType: item.appType,
        connectedCustomerPayload: item.connectedCustomerPayload,
        isActive: item.isActive,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    });
};

export const transformCustomerToDomain = (
    item: Customer,
    applicationCustomerDetail: ApplicationCustomerDetail | null,
    reservationCustomerDetail: ReservationCustomerDetail | null,
    connectedCustomerDetails: ConnectedCustomerDetails[] = [],
): DomainCustomer => {
    const domainConnectedCustomerDetails = connectedCustomerDetails.map(transformConnectedCustomerDetailToDomain);

    return new DomainCustomer({
        customerId: item.customerId,
        connectedFirebaseId: item.connectedFirebaseId,
        email: item.email,
        bizUserId: item.bizUserId || '',
        isBizUser: item.isBizUser || false,
        socialAccount: item.socialAccount as SocialAccount,
        applicationCustomerDetail: applicationCustomerDetail
            ? transformApplicationCustomerToDomain(applicationCustomerDetail)
            : undefined,
        reservationCustomerDetail: reservationCustomerDetail
            ? transformReservationCustomerToDomain(reservationCustomerDetail)
            : undefined,
        connectedCustomerDetails: domainConnectedCustomerDetails,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        isDeleted: item.isDeleted,
    });
};

export const transformReservationCustomerToDomain = (
    item: ReservationCustomerDetail,
): DomainReservationCustomerDetail =>
    new DomainReservationCustomerDetail({
        reservationCustomerDetailId: item.reservationCustomerDetailId,
        customerId: item.customerId,
        customerType: (item.customerType as CustomerType) || undefined,
        firstName: item.firstName,
        lastName: item.lastName || '',
        nickname: item.nickname || '',
        dateOfBirth: item.dateOfBirth || '',
        postCode: item.postCode || '',
        gender: (item.gender as GenderType) || undefined,
        residenceArea: item.residenceArea || '',
        acceptDirectMail: item.acceptDirectMail || false,
        emailAddress: item.emailAddress || '',
        language: item.language || 'ja',
        phoneNumber: item.phoneNumber || '',
        isActive: item.isActive,
        isDeleted: item.isDeleted,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        username: item.username || undefined,
        city: item.city || undefined,
        province: item.province || undefined,
        pronounceFirstName: item.pronounceFirstName || '',
        pronounceLastName: item.pronounceLastName || '',
    });

export const transformReservationCustomerFromDomain = (
    d: DomainReservationCustomerDetail,
): ReservationCustomerDetail => {
    return {
        reservationCustomerDetailId: d.reservationCustomerDetailId,
        customerId: d.customerId,
        customerType: (d.customerType as CustomerType) || null,
        firstName: d.firstName,
        lastName: d.lastName || '',
        nickname: d.nickname || '',
        dateOfBirth: d.dateOfBirth || '',
        postCode: d.postCode || '',
        gender: (d.gender as GenderType) || null,
        residenceArea: d.residenceArea || '',
        acceptDirectMail: d.acceptDirectMail || false,
        emailAddress: d.emailAddress || '',
        language: d.language || 'ja',
        phoneNumber: d.phoneNumber || null,
        isActive: d.isActive,
        isDeleted: d.isDeleted,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
        username: d.username || null,
        city: d.city || null,
        province: d.province || null,
        pronounceFirstName: d.pronounceFirstName || '',
        pronounceLastName: d.pronounceLastName || '',
    };
};

export const transformToDomain = (
    item: Customer,
    applicationCustomerDetail: ApplicationCustomerDetail | null,
    reservationCustomerDetail: ReservationCustomerDetail | null,
): DomainCustomer =>
    new DomainCustomer({
        customerId: item.customerId,
        connectedFirebaseId: item.connectedFirebaseId,
        email: item.email,
        bizUserId: item.bizUserId || '',
        isBizUser: item.isBizUser || false,
        socialAccount: item.socialAccount as SocialAccount,
        applicationCustomerDetail: applicationCustomerDetail
            ? transformApplicationCustomerToDomain(applicationCustomerDetail)
            : undefined,
        reservationCustomerDetail: reservationCustomerDetail
            ? transformReservationCustomerToDomain(reservationCustomerDetail)
            : undefined,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        isDeleted: item.isDeleted,
    });

export const transformFromDomain = (d: DomainCustomer): Customer => {
    return {
        customerId: d.customerId,
        connectedFirebaseId: d.connectedFirebaseId,
        email: d.email,
        socialAccount: d.socialAccount,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
        isDeleted: d.isDeleted,
        bizUserId: d.bizUserId || null,
        bizPayload: d.bizPayload || null,
        isBizUser: d.isBizUser || false,
    };
};
