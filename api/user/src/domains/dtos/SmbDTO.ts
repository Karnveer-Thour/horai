import { ResourceEnum } from '../ResourceEnum';

export abstract class SmbDTO {
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
    createdAt: Date;
    updatedAt: Date;
    resourceType: ResourceEnum;

    constructor(
        input: Pick<
            SmbDTO,
            | 'smbId'
            | 'amoId'
            | 'createdAt'
            | 'updatedAt'
            | 'resourceType'
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
        >,
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
        this.resourceType = input.resourceType;
    }
}
