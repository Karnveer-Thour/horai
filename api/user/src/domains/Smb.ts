import { ActivitySmbDTO } from './dtos/ActivitySmbDTO';
import { CoWorkingSpaceSmbDTO } from './dtos/CoWorkingSpaceSmbDTO';
import { ResourceEnum } from './ResourceEnum';
export class Smb {
    smbId: string;
    amoId: string;
    name: string;
    email: string;
    imageUrls: string[];
    description?: string | null;
    precaution?: string | null;
    cancelationPolicy?: string | null;
    optionalEmails?: string[];
    address?: string | null;
    openTime?: string | null;
    closeTime?: string | null;
    reservableItemMapImageUrls?: string[] | [];
    logoUrl?: string | null;
    facilityIntroduction?: string | null;
    isActive: boolean;
    subRole?: SmbSubRoleEnum | null;
    createdAt: Date;
    updatedAt: Date;
    resourceType: ResourceEnum;

    precautionOfReservation?: string;
    cancellationPolicyOfReservation?: string;

    constructor(
        input: Pick<Smb, 'smbId' | 'amoId' | 'createdAt' | 'updatedAt' | 'resourceType' | 'isActive'> &
            SmbUpdatableField,
    ) {
        Object.assign(this, input);
        this.smbId = input.smbId;
        this.amoId = input.amoId;
        this.name = input.name;
        this.email = input.email;
        this.imageUrls = input.imageUrls;
        this.description = input.description;
        this.precaution = input.precaution;
        this.cancelationPolicy = input.cancelationPolicy;
        this.address = input.address;
        this.openTime = input.openTime;
        this.closeTime = input.closeTime;
        this.reservableItemMapImageUrls = input.reservableItemMapImageUrls;
        this.logoUrl = input.logoUrl;
        this.facilityIntroduction = input.facilityIntroduction;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
        this.optionalEmails = input.optionalEmails;
        this.resourceType = input.resourceType || ResourceEnum.Activity;
        this.isActive = input.isActive;
        this.subRole = input.subRole || null;
    }

    public static create = (
        smbId: string,
        amoId: string,
        resourceType: ResourceEnum,
        item: SmbUpdatableField,
        isActive: boolean,
        now: Date,
    ): Smb =>
        new Smb({
            smbId,
            amoId,
            ...item,
            isActive,
            createdAt: now,
            updatedAt: now,
            resourceType: resourceType,
        });

    public update = (input: SmbUpdatableField, now: Date): Smb => {
        this.name = input.name;
        this.email = input.email;
        this.imageUrls = input.imageUrls;
        this.cancelationPolicy = input.cancelationPolicy;
        this.description = input.description;
        this.precaution = input.precaution;
        this.optionalEmails = input.optionalEmails;
        this.address = input.address;
        this.openTime = input.openTime;
        this.reservableItemMapImageUrls = input.reservableItemMapImageUrls;
        this.logoUrl = input.logoUrl;
        this.facilityIntroduction = input.facilityIntroduction;
        this.closeTime = input.closeTime;
        this.precautionOfReservation = input.precautionOfReservation;
        this.cancellationPolicyOfReservation = input.cancellationPolicyOfReservation;
        this.subRole = input.subRole;
        this.updatedAt = now;
        return this;
    };

    public getSmbEmail = (): string[] => {
        // trigger deploy user service
        let emails: string[] = [];
        emails.push(this.email);
        if (this.optionalEmails && this.optionalEmails.length) {
            emails = emails.concat(this.optionalEmails);
        }
        const uniqueEmails: string[] = emails.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        return uniqueEmails;
    };

    public toActivityDTO = (): ActivitySmbDTO => {
        return new ActivitySmbDTO({
            smbId: this.smbId,
            amoId: this.amoId,
            name: this.name,
            email: this.email,
            imageUrls: this.imageUrls,
            description: this.description,
            precaution: this.precaution,
            cancelationPolicy: this.cancelationPolicy,
            address: this.address,
            openTime: this.openTime,
            closeTime: this.closeTime,
            reservableItemMapImageUrls: this.reservableItemMapImageUrls,
            logoUrl: this.logoUrl,
            facilityIntroduction: this.facilityIntroduction,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            optionalEmails: this.optionalEmails,
            resourceType: this.resourceType || ResourceEnum.Activity,
        });
    };

    public updateStatus = (isActive: boolean, now: Date): Smb => {
        this.isActive = isActive;
        this.updatedAt = now;
        return this;
    };

    public toCoWorkingSpaceDTO = (): CoWorkingSpaceSmbDTO => {
        return new CoWorkingSpaceSmbDTO({
            smbId: this.smbId,
            amoId: this.amoId,
            name: this.name,
            email: this.email,
            imageUrls: this.imageUrls,
            description: this.description,
            precaution: this.precaution,
            cancelationPolicy: this.cancelationPolicy,
            address: this.address,
            openTime: this.openTime,
            closeTime: this.closeTime,
            reservableItemMapImageUrls: this.reservableItemMapImageUrls,
            logoUrl: this.logoUrl,
            facilityIntroduction: this.facilityIntroduction,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            optionalEmails: this.optionalEmails,
            resourceType: this.resourceType || ResourceEnum.Activity,
            precautionOfReservation: this.precautionOfReservation || null,
            cancellationPolicyOfReservation: this.cancellationPolicyOfReservation || null,
            subRole: this.subRole || null,
        });
    };
}

export type SmbUpdatableField = Pick<
    Smb,
    | 'name'
    | 'email'
    | 'imageUrls'
    | 'optionalEmails'
    | 'description'
    | 'precaution'
    | 'cancelationPolicy'
    | 'address'
    | 'openTime'
    | 'closeTime'
    | 'reservableItemMapImageUrls'
    | 'logoUrl'
    | 'facilityIntroduction'
    | 'precautionOfReservation'
    | 'cancellationPolicyOfReservation'
    | 'subRole'
>;

export enum SmbSubRoleEnum {
    MEC = 'MEC',
    DRIVERY = 'DRIVERY',
    THY = 'THY',
}
