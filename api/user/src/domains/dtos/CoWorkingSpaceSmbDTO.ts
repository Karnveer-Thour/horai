import { ResourceEnum } from '../ResourceEnum';
import { SmbSubRoleEnum } from '../Smb';
import { SmbDTO } from './SmbDTO';

export class CoWorkingSpaceSmbDTO extends SmbDTO {
    precautionOfReservation: string | null;
    cancellationPolicyOfReservation: string | null;
    subRole?: SmbSubRoleEnum | null;

    constructor(
        input: Pick<
            CoWorkingSpaceSmbDTO,
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
            | 'precautionOfReservation'
            | 'cancellationPolicyOfReservation'
            | 'subRole'
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

        this.precautionOfReservation = input.precautionOfReservation;
        this.cancellationPolicyOfReservation = input.cancellationPolicyOfReservation;
        this.subRole = input.subRole;
    }
}
