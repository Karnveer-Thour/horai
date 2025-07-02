import { ResourceEnum } from '../../../../domains/ResourceEnum';
import { dateTimeRepository, smbRepository } from '../../../../infrastructures/config/IoC/inversify.config';
import { DeactivateSmb } from '../../../../usecases/DeactivateSmb';
import { NotFoundError } from '../../../../usecases/errors/NotFoundError';
import { GetAllSmbs } from '../../../../usecases/GetAllSmbs';
import { GetSmbById } from '../../../../usecases/GetSmbById';
import { SaveNewSmb } from '../../../../usecases/SaveSmb';
import { UpdateSmb } from '../../../../usecases/UpdateSmb';
import { PostgresSmbRepository } from '../../../gateways/repositories/postgres/PostgresSmbRepository';
import { SystemDateTimeRepository } from '../../../gateways/repositories/SystemDateTimeRepository';
import { Components } from '../typings/schema';
import { Service, ServiceResponse } from './Service';
import { SmbSubRoleEnum } from '../../../../domains/Smb';
import { IllegalStateError } from '../../../../usecases/errors/IllegalStateError';

import SmbBody = Components.Schemas.SmbBody;
import SmbUpdateBody = Components.Schemas.SmbUpdateBody;
import SmbStatusBody = Components.Schemas.SmbStatusBody;

export const createSmb = async (input: { authorization: string; smbBody: SmbBody }): Promise<ServiceResponse> => {
    try {
        const usecase = new SaveNewSmb(new SystemDateTimeRepository(), new PostgresSmbRepository());
        const loggedInUser = await Service.loggedInUser(input.authorization);

        //check subRole is valid enum type or not
        if (input.smbBody.subRole && !Object.values(SmbSubRoleEnum).find((value) => value === input.smbBody.subRole)) {
            throw new IllegalStateError(`Invalid Smb subRole: ${input.smbBody.subRole}`);
        }

        await usecase.execute(
            {
                amoId: input.smbBody.amoId,
                name: input.smbBody.name,
                email: input.smbBody.email,
                imageUrls: input.smbBody.imageUrls!,
                optionalEmails: input.smbBody.optionalEmails,
                description: input.smbBody.description!,
                precaution: input.smbBody.precaution!,
                cancelationPolicy: input.smbBody.cancelationPolicy!,
                resourceType: input.smbBody.resourceType
                    ? (input.smbBody.resourceType as ResourceEnum)
                    : ResourceEnum.Activity,
                address: input.smbBody.address || null,
                openTime: input.smbBody.openTime ? input.smbBody.openTime : null,
                closeTime: input.smbBody.closeTime ? input.smbBody.closeTime : null,
                reservableItemMapImageUrls: input.smbBody.reservableItemMapImageUrls || [],
                logoUrl: input.smbBody.logoUrl || null,
                facilityIntroduction: input.smbBody.facilityIntroduction || null,
                precautionOfReservation: input.smbBody.precautionOfReservation,
                cancellationPolicyOfReservation: input.smbBody.cancellationPolicyOfReservation,
                isActive: true,
                subRole: (input.smbBody.subRole as SmbSubRoleEnum) || null,
            },
            loggedInUser,
        );

        return Service.successResponse({}, 204);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const updateSmbBySmbId = async (input: {
    smbId: string;
    authorization: string;
    smbUpdateBody: SmbUpdateBody;
}): Promise<ServiceResponse> => {
    try {
        const usecase = new UpdateSmb(new SystemDateTimeRepository(), new PostgresSmbRepository());
        const loggedInUser = await Service.loggedInUser(input.authorization);

        //check subRole is valid enum type or not
        if (
            input.smbUpdateBody.subRole &&
            !Object.values(SmbSubRoleEnum).find((value) => value === input.smbUpdateBody.subRole)
        ) {
            throw new IllegalStateError(`Invalid Smb subRole: ${input.smbUpdateBody.subRole}`);
        }

        await usecase.execute(
            {
                smbId: input.smbId,
                name: input.smbUpdateBody.name,
                email: input.smbUpdateBody.email,
                imageUrls: input.smbUpdateBody.imageUrls!,
                optionalEmails: input.smbUpdateBody.optionalEmails,
                description: input.smbUpdateBody.description!,
                precaution: input.smbUpdateBody.precaution!,
                cancelationPolicy: input.smbUpdateBody.cancelationPolicy!,
                address: input.smbUpdateBody.address || null,
                openTime: input.smbUpdateBody.openTime ? input.smbUpdateBody.openTime : null,
                closeTime: input.smbUpdateBody.closeTime ? input.smbUpdateBody.closeTime : null,
                reservableItemMapImageUrls: input.smbUpdateBody.reservableItemMapImageUrls || [],
                logoUrl: input.smbUpdateBody.logoUrl || null,
                facilityIntroduction: input.smbUpdateBody.facilityIntroduction || null,
                precautionOfReservation: input.smbUpdateBody.precautionOfReservation,
                cancellationPolicyOfReservation: input.smbUpdateBody.cancellationPolicyOfReservation,
                subRole: (input.smbUpdateBody.subRole as SmbSubRoleEnum) || null,
            },
            loggedInUser,
        );
        return Service.successResponse({}, 204);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const deactivateSmb = async (input: {
    smbId: string;
    authorization: string;
    smbStatusBody: SmbStatusBody;
}): Promise<ServiceResponse> => {
    try {
        const usecase = new DeactivateSmb(dateTimeRepository, smbRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        await usecase.execute({ smbId: input.smbId, isActive: input.smbStatusBody.isActive }, loggedInUser);

        return Service.successResponse({}, 200);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const getAllSmbs = async (input: { authorization: string }): Promise<ServiceResponse> => {
    try {
        const usecase = new GetAllSmbs(smbRepository);
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const res = await usecase.execute(loggedInUser);
        return Service.successResponse(res, 200);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const getSmbBySmbId = async (input: { authorization: string; smbId: string }): Promise<ServiceResponse> => {
    try {
        const usecase = new GetSmbById(new PostgresSmbRepository());
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const res = await usecase.execute(input.smbId, loggedInUser);
        return Service.successResponse(res);
    } catch (e: any) {
        if (e instanceof NotFoundError) {
            return Service.errorResponse(e, 404);
        }
        return Service.errorResponse(e);
    }
};
