export declare namespace Components {
    export interface HeaderParameters {
        DO_NOT_USE_THIS_authorization?: Parameters.DONOTUSETHISAuthorization;
        internalHeader?: Parameters.InternalHeader;
    }
    namespace Parameters {
        export type DONOTUSETHISAuthorization = string;
        export type InternalHeader = string;
        export type ReportId = string;
        export type SmbId = string;
    }
    export interface PathParameters {
        smbId: Parameters.SmbId;
        reportId: Parameters.ReportId;
    }
    namespace Schemas {
        export interface Amo {
            name: string;
            email: string;
            amoId: string;
            createdAt: string; // date-time
            updatedAt: string; // date-time
        }
        export interface AmoBody {
            name: string;
            email: string;
        }
        export interface AmoStatusBody {
            isActive: boolean;
        }
        /**
         * Customer
         */
        export interface Customer {
            customerId: string;
            connectedFirebaseId?: string;
            email: string;
            socialAccount?: 'EMAIL' | 'FACEBOOK' | 'TWITTER' | 'APPLE' | 'GOOGLE';
            customerType?: 'REGULAR' | 'GUEST';
            firstName: string;
            lastName: string;
            nickname?: string;
            dateOfBirth?: string;
            postCode?: string;
            gender?: 'MALE' | 'FEMALE' | 'OTHER';
            residenceArea?: string;
            acceptDirectMail?: boolean;
            emailAddress?: string;
            language?: string;
            phoneNumber?: string;
            isActive?: boolean;
            isDeleted?: boolean;
            username?: string;
            city?: string;
            province?: string;
            pronounceFirstName?: string;
            pronounceLastName?: string;
            serviceType?: 'CoWorkingSpace' | 'Reservation' | 'Application';
            createdAt: string; // date-time
            updatedAt: string; // date-time
        }
        /**
         * CustomerBody
         */
        export interface CustomerBody {
            customerId?: string;
            connectedFirebaseId?: string;
            email: string;
            socialAccount?: 'EMAIL' | 'FACEBOOK' | 'TWITTER' | 'APPLE' | 'GOOGLE';
            customerType?: 'REGULAR' | 'GUEST';
            firstName: string;
            lastName: string;
            nickname?: string;
            dateOfBirth?: string;
            postCode?: string;
            gender?: 'MALE' | 'FEMALE' | 'OTHER';
            residenceArea?: string;
            acceptDirectMail?: boolean;
            emailAddress?: string;
            language?: string;
            phoneNumber?: string;
            isActive?: boolean;
            isDeleted?: boolean;
            username?: string;
            city?: string;
            province?: string;
            pronounceFirstName?: string;
            pronounceLastName?: string;
        }
        /**
         * CustomerList
         */
        export interface CustomerList {
            list?: /* Customer */ Customer[];
            totalPage?: number;
        }
        /**
         * DeviceTokenBody
         */
        export interface DeviceTokenBody {
            deviceToken: string;
            serviceType: 'CoWorkingSpace' | 'Reservation' | 'Application';
        }
        /**
         * DxCoreUserDeviceTokenResponseBody
         */
        export interface DxCoreUserDeviceTokenResponseBody {
            email: string;
            deviceTokens: /* UserDeviceToken */ UserDeviceToken[];
        }
        /**
         * generateOtpBody
         */
        export interface GenerateOtpBody {
            email: string;
        }
        /**
         * InternalGetCustomersBody
         */
        export interface InternalGetCustomersBody {
            customerIds?: /* Uuidv4 */ Uuidv4 /* ^[a-zA-Z0-9]{20,30}$|^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$ */[];
        }
        export interface Report {
            reportLink: string;
            reportType: string;
            name: string;
            reportId: string;
            smbId: string;
        }
        export interface ReportUpdateBody {
            reportLink: string;
            reportType: string;
            name: string;
        }
        /**
         * SMB
         */
        export interface Smb {
            amoId: string;
            name: string;
            email: string;
            optionalEmails?: string[];
            imageUrls?: string[]; // uri
            description?: string;
            precaution?: string;
            cancelationPolicy?: string;
            resourceType?: 'CoWorkingSpace' | 'Activity' | 'BoatTour' | 'EventTicket';
            address?: string;
            openTime?: string; // time
            closeTime?: string; // time
            reservableItemMapImageUrls?: string[]; // uri
            logoUrl?: string; // uri
            facilityIntroduction?: string;
            precautionOfReservation?: string;
            cancellationPolicyOfReservation?: string;
            subRole?: 'MEC' | 'DRIVERY' | 'THY';
            smbId: string;
            createdAt: string; // date-time
            updatedAt: string; // date-time
        }
        export interface SmbBody {
            amoId: string;
            name: string;
            email: string;
            optionalEmails?: string[];
            imageUrls?: string[]; // uri
            description?: string;
            precaution?: string;
            cancelationPolicy?: string;
            resourceType?: 'CoWorkingSpace' | 'Activity' | 'BoatTour' | 'EventTicket';
            address?: string;
            openTime?: string; // time
            closeTime?: string; // time
            reservableItemMapImageUrls?: string[]; // uri
            logoUrl?: string; // uri
            facilityIntroduction?: string;
            precautionOfReservation?: string;
            cancellationPolicyOfReservation?: string;
            subRole?: 'MEC' | 'DRIVERY' | 'THY';
        }
        export interface SmbStatusBody {
            isActive: boolean;
        }
        export interface SmbUpdateBody {
            name: string;
            email: string;
            optionalEmails?: string[];
            imageUrls?: string[]; // uri
            description?: string;
            precaution?: string;
            cancelationPolicy?: string;
            address?: string;
            openTime?: string; // time
            closeTime?: string; // time
            reservableItemMapImageUrls?: string[]; // uri
            logoUrl?: string; // uri
            facilityIntroduction?: string;
            precautionOfReservation?: string;
            cancellationPolicyOfReservation?: string;
            subRole?: 'MEC' | 'DRIVERY' | 'THY';
        }
        /**
         * TodoReport
         */
        export interface TodoReport {
            name: string;
            Smbid: string;
            reportLink: string;
            reportType: 'PDF' | 'LookerStudio';
            reportId: string;
            createdAt: string; // date-time
            updatedAt: string; // date-time
        }
        /**
         * TodoReportBody
         */
        export interface TodoReportBody {
            name: string;
            Smbid: string;
            reportLink: string;
            reportType: 'PDF' | 'LookerStudio';
        }
        /**
         * TodoReportHistory
         */
        export interface TodoReportHistory {
            name: string;
            Smbid: string;
            reportLink: string;
            reportType: 'PDF' | 'LookerStudio';
            reportHistoryId: string;
            createdAt: string; // date-time
            updatedAt: string; // date-time
        }
        /**
         * TodoReportHistoryBody
         */
        export interface TodoReportHistoryBody {
            userId: string;
            reportId: string;
        }
        /**
         * TodoReportBody
         */
        export interface TodoReportUpdateBody {
            name: string;
            reportLink: string;
            reportType: 'PDF' | 'LookerStudio';
        }
        /**
         * user
         */
        export interface User {
            userRole?: /* UserRole */ UserRole;
        }
        /**
         * UserBody
         */
        export interface UserBody {
            userId?: string;
            role?: 'sv' | 'amo' | 'smb';
            amoId?: string;
            smbId?: string;
            amo?: Amo;
            smb?: /* SMB */ Smb;
            createdAt?: string;
            updatedAt?: string;
            status?: 'ACTIVE' | 'INACTIVE';
        }
        /**
         * UserDeviceToken
         */
        export interface UserDeviceToken {
            deviceToken: string;
            serviceType: 'CoWorkingSpace' | 'Reservation' | 'Application';
            userDeviceTokenId: string;
            email: string;
            createdAt: string; // date-time
            updatedAt: string; // date-time
        }
        /**
         * UserDeviceTokenResponseBody
         */
        export interface UserDeviceTokenResponseBody {
            email: string;
            deviceTokens: /* UserDeviceToken */ UserDeviceToken[];
            userDetails?: {
                [key: string]: any;
            };
        }
        /**
         * UserList
         */
        export interface UserList {
            list?: /* UserBody */ UserBody[];
            totalPage?: number;
        }
        /**
         * UserRole
         */
        export interface UserRole {
            role?: 'sv' | 'amo' | 'smb';
            amoId?: string;
            smbId?: string;
            emailAddress: string;
            amo?: Amo;
            smb?: /* SMB */ Smb;
            createdAt: string; // date-time
            updatedAt: string; // date-time
        }
        /**
         * UserRoleBody
         */
        export interface UserRoleBody {
            role?: 'sv' | 'amo' | 'smb';
            amoId?: string;
            smbId?: string;
        }
        /**
         * Uuidv4
         */
        export type Uuidv4 = string; // ^[a-zA-Z0-9]{20,30}$|^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$
        /**
         * verifyOtpBody
         */
        export interface VerifyOtpBody {
            customerId?: string;
            connectedFirebaseId?: string;
            email: string;
            socialAccount?: 'EMAIL' | 'FACEBOOK' | 'TWITTER' | 'APPLE' | 'GOOGLE';
            customerType?: 'REGULAR' | 'GUEST';
            firstName: string;
            lastName: string;
            nickname?: string;
            dateOfBirth?: string;
            postCode?: string;
            gender?: 'MALE' | 'FEMALE' | 'OTHER';
            residenceArea?: string;
            acceptDirectMail?: boolean;
            emailAddress?: string;
            language?: string;
            phoneNumber?: string;
            isActive?: boolean;
            isDeleted?: boolean;
            username?: string;
            city?: string;
            province?: string;
            pronounceFirstName?: string;
            pronounceLastName?: string;
            hash: string;
            otp: string;
            password: string;
        }
    }
}
declare namespace Paths {
    namespace AccountLinking {
        namespace Parameters {
            export type AppAccountAuthorizationToken = string;
            export type AppType = string;
            export type HoraiAuthorizationToken = string;
        }
        export interface QueryParameters {
            horai_authorization_token: Parameters.HoraiAuthorizationToken;
            appAccount_authorization_token: Parameters.AppAccountAuthorizationToken;
            appType: Parameters.AppType;
        }
        namespace Responses {
            export interface $200 {}
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace AddBuilMiraiDeviceData {
        namespace Parameters {
            export type FromDate = string; // date-time
            export type ToDate = string; // date-time
        }
        export interface QueryParameters {
            fromDate?: Parameters.FromDate /* date-time */;
            toDate?: Parameters.ToDate /* date-time */;
        }
        namespace Responses {
            export interface $200 {}
            export interface $401 {}
            export interface $403 {}
            export interface $500 {}
        }
    }
    namespace AddDxCoreData {
        namespace Responses {
            export interface $200 {}
            export interface $401 {}
            export interface $403 {}
            export interface $500 {}
        }
    }
    namespace Amos$AmoId {
        namespace Put {
            namespace Parameters {
                export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
                export type AmoId = string;
            }
            export interface PathParameters {
                amoId: Parameters.AmoId;
            }
            export type RequestBody = Components.Schemas.AmoBody;
            namespace Responses {
                export interface $204 {}
                export interface $400 {}
                export interface $401 {}
                export interface $500 {}
            }
        }
    }
    namespace BizUserCommunication {
        namespace Parameters {
            export type BizAuthorizationToken = string;
            export type HoraiAuthorizationToken = string;
        }
        export interface QueryParameters {
            horai_authorization_token: Parameters.HoraiAuthorizationToken;
            biz_authorization_token: Parameters.BizAuthorizationToken;
        }
        namespace Responses {
            export interface $200 {}
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace CreateAmo {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
        }
        export type RequestBody = Components.Schemas.AmoBody;
        namespace Responses {
            export interface $204 {}
            export interface $400 {}
            export interface $401 {}
            export interface $500 {}
        }
    }
    namespace CreateCustomer {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
        }
        export type RequestBody = /* CustomerBody */ Components.Schemas.CustomerBody;
        namespace Responses {
            export type $200 = /* Customer */ Components.Schemas.Customer;
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace CreateInternalCustomer {
        namespace Parameters {
            export type $0 = Components.Parameters.InternalHeader;
            export type $1 = Components.Parameters.DONOTUSETHISAuthorization;
        }
        export type RequestBody = /* CustomerBody */ Components.Schemas.CustomerBody;
        namespace Responses {
            export interface $204 {}
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace CreateReport {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
        }
        export type RequestBody = /* TodoReportBody */ Components.Schemas.TodoReportBody;
        namespace Responses {
            export type $200 = /* TodoReport */ Components.Schemas.TodoReport;
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace CreateSmb {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
        }
        export type RequestBody = Components.Schemas.SmbBody;
        namespace Responses {
            export interface $204 {}
            export interface $401 {}
            export interface $403 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace CreateUser {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type Email = string;
        }
        export interface PathParameters {
            email: Parameters.Email;
        }
        export type RequestBody = /* UserBody */ Components.Schemas.UserBody;
        namespace Responses {
            export interface $204 {}
            export interface $400 {}
            export interface $401 {}
            export interface $500 {}
        }
    }
    namespace DeactivateSmb {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type $1 = Components.Parameters.SmbId;
        }
        export type RequestBody = Components.Schemas.SmbStatusBody;
        namespace Responses {
            export interface $204 {}
            export interface $400 {}
            export interface $401 {}
            export interface $500 {}
        }
    }
    namespace DeleteAmoByamoId {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type AmoId = string;
        }
        export interface PathParameters {
            amoId: Parameters.AmoId;
        }
        namespace Responses {
            export interface $200 {}
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace DeleteCustomerById {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type CustomerId = string;
            export type ServiceType = 'Application' | 'Reservation' | 'CoWorkingSpace';
        }
        export interface PathParameters {
            customerId: Parameters.CustomerId;
        }
        export interface QueryParameters {
            serviceType?: Parameters.ServiceType;
        }
        namespace Responses {
            export interface $204 {}
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace DeleteUserDeviceToken {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type DeviceToken = string;
        }
        export interface PathParameters {
            deviceToken: Parameters.DeviceToken;
        }
        namespace Responses {
            export interface $204 {}
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace GenerateOtp {
        export type RequestBody = /* generateOtpBody */ Components.Schemas.GenerateOtpBody;
        namespace Responses {
            export interface $200 {
                hash?: string;
                message?: string;
            }
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace GetAll {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type Limit = number;
            export type Page = number;
            export type ReportType = string;
            export type SearchText = string;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            limit?: Parameters.Limit;
            searchText?: Parameters.SearchText;
            reportType?: Parameters.ReportType;
        }
        namespace Responses {
            export type $200 = /* TodoReport */ Components.Schemas.TodoReport;
            export interface $404 {}
        }
    }
    namespace GetAllAmos {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Amo[];
            export interface $401 {}
            export interface $403 {}
            export interface $500 {}
        }
    }
    namespace GetAllCustomers {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type Limit = number;
            export type Page = number;
            export type SearchText = string;
            export type ServiceType = 'Application' | 'Reservation' | 'CoWorkingSpace';
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            limit?: Parameters.Limit;
            searchText?: Parameters.SearchText;
            serviceType?: Parameters.ServiceType;
        }
        namespace Responses {
            export type $200 = /* CustomerList */ Components.Schemas.CustomerList;
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace GetAllReportHistory {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type Limit = number;
            export type Page = number;
            export type ReportType = string;
            export type SearchText = string;
        }
        export interface QueryParameters {
            page?: Parameters.Page;
            limit?: Parameters.Limit;
            searchText?: Parameters.SearchText;
            reportType?: Parameters.ReportType;
        }
        namespace Responses {
            export type $200 = /* TodoReportHistory */ Components.Schemas.TodoReportHistory[];
            export interface $404 {}
        }
    }
    namespace GetAllSmbs {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
        }
        namespace Responses {
            export type $200 = /* SMB */ Components.Schemas.Smb[];
            export interface $401 {}
            export interface $403 {}
            export interface $500 {}
        }
    }
    namespace GetAmoById {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type AmoId = string;
        }
        export interface PathParameters {
            amoId: Parameters.AmoId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AmoBody;
            export interface $404 {}
        }
    }
    namespace GetAmoByamoId {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type AmoId = string;
        }
        export interface PathParameters {
            amoId: Parameters.AmoId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AmoBody;
            export interface $404 {}
        }
    }
    namespace GetAmos {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Amo[];
            export interface $401 {}
            export interface $403 {}
            export interface $500 {}
        }
    }
    namespace GetCustomerById {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type CustomerId = string;
            export type SocialAccount = 'EMAIL' | 'FACEBOOK' | 'TWITTER' | 'APPLE' | 'GOOGLE';
        }
        export interface PathParameters {
            customerId: Parameters.CustomerId;
        }
        export interface QueryParameters {
            socialAccount?: Parameters.SocialAccount;
        }
        namespace Responses {
            export type $200 = /* Customer */ Components.Schemas.Customer;
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace GetInternalCustomer {
        namespace Parameters {
            export type $0 = Components.Parameters.InternalHeader;
            export type $1 = Components.Parameters.DONOTUSETHISAuthorization;
        }
        export type RequestBody = /* InternalGetCustomersBody */ Components.Schemas.InternalGetCustomersBody;
        namespace Responses {
            export type $200 = /* Customer */ Components.Schemas.Customer[];
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace GetInternalCustomerById {
        namespace Parameters {
            export type $0 = Components.Parameters.InternalHeader;
            export type $1 = Components.Parameters.DONOTUSETHISAuthorization;
            export type CustomerId = string;
            export type ServiceType = 'Application' | 'Reservation' | 'CoWorkingSpace';
        }
        export interface PathParameters {
            customerId: Parameters.CustomerId;
        }
        export interface QueryParameters {
            serviceType?: Parameters.ServiceType;
        }
        namespace Responses {
            export type $200 = /* Customer */ Components.Schemas.Customer;
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace GetInternalCustomerByIds {
        namespace Parameters {
            export type $0 = Components.Parameters.InternalHeader;
            export type $1 = Components.Parameters.DONOTUSETHISAuthorization;
        }
        export type RequestBody = /* InternalGetCustomersBody */ Components.Schemas.InternalGetCustomersBody;
        namespace Responses {
            export type $200 = /* Customer */ Components.Schemas.Customer[];
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace GetMe {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
        }
        namespace Responses {
            export type $200 = /* user */ Components.Schemas.User[];
            export interface $401 {}
            export interface $403 {}
            export interface $500 {}
        }
    }
    namespace GetReportById {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type ReportId = string;
        }
        export interface PathParameters {
            reportId: Parameters.ReportId;
        }
        namespace Responses {
            export type $200 = /* TodoReport */ Components.Schemas.TodoReport;
            export interface $404 {}
        }
    }
    namespace GetReportHistoryById {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type ReportHistoryId = string;
        }
        export interface PathParameters {
            reportHistoryId: Parameters.ReportHistoryId;
        }
        namespace Responses {
            export type $200 = /* TodoReportHistory */ Components.Schemas.TodoReportHistory;
            export interface $404 {}
        }
    }
    namespace GetReportHistoryByReportId {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type ReportId = string;
        }
        export interface PathParameters {
            reportId: Parameters.ReportId;
        }
        namespace Responses {
            export type $200 = /* TodoReportHistory */ Components.Schemas.TodoReportHistory[];
            export interface $404 {}
        }
    }
    namespace GetReportHistoryBySmbId {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type SmbId = string;
        }
        export interface PathParameters {
            smbId: Parameters.SmbId;
        }
        namespace Responses {
            export type $200 = /* TodoReportHistory */ Components.Schemas.TodoReportHistory[];
            export interface $404 {}
        }
    }
    namespace GetReportsBySmbId {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type $1 = Components.Parameters.SmbId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Report[];
            export interface $401 {}
            export interface $403 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace GetSmbById {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type $1 = Components.Parameters.SmbId;
        }
        namespace Responses {
            export type $200 = /* SMB */ Components.Schemas.Smb;
            export interface $401 {}
            export interface $403 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace GetSmbBySmbId {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type $1 = Components.Parameters.SmbId;
        }
        namespace Responses {
            export type $200 = /* SMB */ Components.Schemas.Smb;
            export interface $401 {}
            export interface $403 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace GetSmbs {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type AmoId = string;
        }
        export interface QueryParameters {
            amoId?: Parameters.AmoId;
        }
        namespace Responses {
            export type $200 = /* SMB */ Components.Schemas.Smb[];
            export interface $401 {}
            export interface $403 {}
            export interface $500 {}
        }
    }
    namespace GetTechHubYokohama {
        namespace Responses {
            export type $200 = /* SMB */ Components.Schemas.Smb;
            export interface $403 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace GetTheSeatHalkiSmb {
        namespace Responses {
            export type $200 = /* SMB */ Components.Schemas.Smb;
            export interface $403 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace GetUser {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type Email = string;
        }
        export interface PathParameters {
            email: Parameters.Email;
        }
        namespace Responses {
            export type $200 = /* UserBody */ Components.Schemas.UserBody;
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace GetUserRole {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type EmailAddress = string;
        }
        export interface PathParameters {
            emailAddress: Parameters.EmailAddress;
        }
        namespace Responses {
            export type $200 = /* UserRole */ Components.Schemas.UserRole;
        }
    }
    namespace GetUserRoles {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
        }
        namespace Responses {
            export type $200 = /* UserRole */ Components.Schemas.UserRole[];
        }
    }
    namespace Hc {
        namespace Get {
            namespace Responses {
                export interface $200 {}
            }
        }
    }
    namespace InternalGetAllDxCoreUserDeviceTokenService {
        namespace Parameters {
            export type $0 = Components.Parameters.InternalHeader;
            export type $1 = Components.Parameters.DONOTUSETHISAuthorization;
            export type ServiceType = 'Application' | 'Reservation' | 'CoWorkingSpace';
        }
        export interface QueryParameters {
            serviceType?: Parameters.ServiceType;
        }
        namespace Responses {
            export type $200 =
                /* DxCoreUserDeviceTokenResponseBody */ Components.Schemas.DxCoreUserDeviceTokenResponseBody[];
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace InternalGetSmbById {
        namespace Parameters {
            export type $0 = Components.Parameters.InternalHeader;
            export type $1 = Components.Parameters.DONOTUSETHISAuthorization;
            export type $2 = Components.Parameters.SmbId;
        }
        namespace Responses {
            export type $200 = /* SMB */ Components.Schemas.Smb;
            export interface $401 {}
            export interface $403 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace InternalGetSmbs {
        namespace Parameters {
            export type $0 = Components.Parameters.InternalHeader;
            export type $1 = Components.Parameters.DONOTUSETHISAuthorization;
            export type AmoId = string;
        }
        export interface QueryParameters {
            amoId?: Parameters.AmoId;
        }
        namespace Responses {
            export type $200 = /* SMB */ Components.Schemas.Smb[];
            export interface $401 {}
            export interface $403 {}
            export interface $500 {}
        }
    }
    namespace InternalGetUserDeviceTokenService {
        namespace Parameters {
            export type $0 = Components.Parameters.InternalHeader;
            export type $1 = Components.Parameters.DONOTUSETHISAuthorization;
            export type Email = string;
            export type ServiceType = 'Application' | 'Reservation' | 'CoWorkingSpace';
        }
        export interface PathParameters {
            email: Parameters.Email;
        }
        export interface QueryParameters {
            serviceType?: Parameters.ServiceType;
        }
        namespace Responses {
            export type $200 = /* UserDeviceTokenResponseBody */ Components.Schemas.UserDeviceTokenResponseBody;
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace InternalGetUserService {
        namespace Parameters {
            export type $0 = Components.Parameters.InternalHeader;
            export type $1 = Components.Parameters.DONOTUSETHISAuthorization;
            export type Email = string;
        }
        export interface PathParameters {
            email: Parameters.Email;
        }
        namespace Responses {
            export type $200 = /* UserBody */ Components.Schemas.UserBody;
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace ListUsers {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type EndIndex = number;
            export type StartIndex = number;
        }
        export interface QueryParameters {
            startIndex?: Parameters.StartIndex;
            endIndex?: Parameters.EndIndex;
        }
        namespace Responses {
            export type $200 = /* UserList */ Components.Schemas.UserList;
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace SoftDeleteInternalCustomerById {
        namespace Parameters {
            export type $0 = Components.Parameters.InternalHeader;
            export type $1 = Components.Parameters.DONOTUSETHISAuthorization;
            export type CustomerId = string;
            export type ServiceType = 'Application' | 'Reservation' | 'CoWorkingSpace';
        }
        export interface PathParameters {
            customerId: Parameters.CustomerId;
        }
        export interface QueryParameters {
            serviceType?: Parameters.ServiceType;
        }
        namespace Responses {
            export interface $204 {}
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace SoftDeleteReportById {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type ReportId = string;
        }
        export interface PathParameters {
            reportId: Parameters.ReportId;
        }
        namespace Responses {
            export interface $200 {}
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace UnlinkBizUserConnection {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
        }
        namespace Responses {
            export interface $200 {}
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace UnlinkCustomerConnection {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type AppType = string;
        }
        export interface QueryParameters {
            appType: Parameters.AppType;
        }
        namespace Responses {
            export interface $200 {}
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace UpdateAmoStatus {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type AmoId = string;
        }
        export interface PathParameters {
            amoId: Parameters.AmoId;
        }
        export type RequestBody = Components.Schemas.AmoStatusBody;
        namespace Responses {
            export interface $204 {}
            export interface $400 {}
            export interface $401 {}
            export interface $500 {}
        }
    }
    namespace UpdateAmobyamoId {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type AmoId = string;
        }
        export interface PathParameters {
            amoId: Parameters.AmoId;
        }
        export type RequestBody = Components.Schemas.AmoBody;
        namespace Responses {
            export interface $204 {}
            export interface $400 {}
            export interface $401 {}
            export interface $500 {}
        }
    }
    namespace UpdateCustomerById {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type CustomerId = string;
        }
        export interface PathParameters {
            customerId: Parameters.CustomerId;
        }
        export type RequestBody = /* CustomerBody */ Components.Schemas.CustomerBody;
        namespace Responses {
            export interface $204 {}
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace UpdateInternalCustomerById {
        namespace Parameters {
            export type $0 = Components.Parameters.InternalHeader;
            export type $1 = Components.Parameters.DONOTUSETHISAuthorization;
            export type CustomerId = string;
        }
        export interface PathParameters {
            customerId: Parameters.CustomerId;
        }
        export type RequestBody = /* CustomerBody */ Components.Schemas.CustomerBody;
        namespace Responses {
            export interface $204 {}
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace UpdateReport {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type $1 = Components.Parameters.SmbId;
            export type $2 = Components.Parameters.ReportId;
        }
        export type RequestBody = Components.Schemas.ReportUpdateBody;
        namespace Responses {
            export interface $204 {}
            export interface $400 {}
            export interface $401 {}
            export interface $500 {}
        }
    }
    namespace UpdateReportById {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type ReportId = string;
        }
        export interface PathParameters {
            reportId: Parameters.ReportId;
        }
        export type RequestBody = /* TodoReportBody */ Components.Schemas.TodoReportUpdateBody;
        namespace Responses {
            export interface $204 {}
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace UpdateSmb {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type $1 = Components.Parameters.SmbId;
        }
        export type RequestBody = Components.Schemas.SmbBody;
        namespace Responses {
            export interface $204 {}
            export interface $401 {}
            export interface $403 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace UpdateSmbBySmbId {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type $1 = Components.Parameters.SmbId;
        }
        export type RequestBody = Components.Schemas.SmbUpdateBody;
        namespace Responses {
            export interface $204 {}
            export interface $400 {}
            export interface $401 {}
            export interface $500 {}
        }
    }
    namespace UpdateUser {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type Email = string;
        }
        export interface PathParameters {
            email: Parameters.Email;
        }
        export type RequestBody = /* UserBody */ Components.Schemas.UserBody;
        namespace Responses {
            export type $200 = /* UserBody */ Components.Schemas.UserBody;
            export interface $204 {}
            export interface $400 {}
            export interface $401 {}
            export interface $500 {}
        }
    }
    namespace UpdateUserDeviceToken {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
        }
        export type RequestBody = /* DeviceTokenBody */ Components.Schemas.DeviceTokenBody;
        namespace Responses {
            export interface $204 {}
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
    namespace UserDELETE {
        namespace Parameters {
            export type $0 = Components.Parameters.DONOTUSETHISAuthorization;
            export type Email = string;
        }
        export interface PathParameters {
            email: Parameters.Email;
        }
        namespace Responses {
            export type $200 = /* UserBody */ Components.Schemas.UserBody;
            export interface $401 {}
            export interface $404 {}
            export interface $500 {}
        }
    }
}
