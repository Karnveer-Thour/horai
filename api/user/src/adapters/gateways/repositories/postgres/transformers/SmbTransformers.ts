import { Smb } from '@prisma/client';
import { ResourceEnum } from '../../../../../domains/ResourceEnum';

import { Smb as DomainSmb } from '../../../../../domains/Smb';

export const transformSmbToDomain = (item: Smb): DomainSmb =>
    new DomainSmb({
        smbId: item.smbId,
        amoId: item.amoId,
        name: item.name,
        email: item.email,
        imageUrls: item.imageUrls,
        description: item.description || undefined,
        precaution: item.precaution || undefined,
        cancelationPolicy: item.cancelationPolicy || undefined,
        resourceType: item.resourceType as ResourceEnum,
        optionalEmails: item.optionalEmails || undefined,
        address: item.address || null,
        openTime: item.openTime || null,
        closeTime: item.closeTime || null,
        reservableItemMapImageUrls: item.reservableItemMapImageUrls || [],
        logoUrl: item.logoUrl || null,
        facilityIntroduction: item.facilityIntroduction || null,
        precautionOfReservation: item.precautionOfReservation || undefined,
        cancellationPolicyOfReservation: item.cancellationPolicyOfReservation || undefined,
        isActive: item.isActive,
        //@ts-ignore
        subRole: item.subRole || null,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    });

export const transformSmbFromDomain = (d: DomainSmb): Smb => {
    return {
        smbId: d.smbId,
        amoId: d.amoId,
        name: d.name,
        email: d.email,
        imageUrls: d.imageUrls,
        description: d.description || null,
        precaution: d.precaution || null,
        cancelationPolicy: d.cancelationPolicy || null,
        resourceType: d.resourceType as 'CoWorkingSpace' | 'Activity',
        optionalEmails: d.optionalEmails || [],
        address: d.address || null,
        openTime: d.openTime || null,
        closeTime: d.closeTime || null,
        reservableItemMapImageUrls: d.reservableItemMapImageUrls || [],
        logoUrl: d.logoUrl || null,
        facilityIntroduction: d.facilityIntroduction || null,
        precautionOfReservation: d.precautionOfReservation || null,
        cancellationPolicyOfReservation: d.cancellationPolicyOfReservation || null,
        isActive: d.isActive,
        subRole: d.subRole || null,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
    };
};
