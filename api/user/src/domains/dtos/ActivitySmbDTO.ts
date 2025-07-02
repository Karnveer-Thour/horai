import { ResourceEnum } from '../ResourceEnum';
import { SmbDTO } from './SmbDTO';

export class ActivitySmbDTO extends SmbDTO {
    constructor(
        input: Pick<
            ActivitySmbDTO,
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
        super(input);
        this.resourceType = ResourceEnum.CoWorkingSpace;
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
    }
}
