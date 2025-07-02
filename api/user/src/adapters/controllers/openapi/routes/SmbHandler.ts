import { ResourceEnum } from '../../../../domains/ResourceEnum';
import { GetTheSeatHalkiSmb } from '../../../../usecases/coWorkingSpace/GetTheSeatHalkiSmb';
import { NotFoundError } from '../../../../usecases/errors/NotFoundError';
import { GetSmb } from '../../../../usecases/GetSmb';
import { GetSmbs } from '../../../../usecases/GetSmbs';
import { SaveSmb } from '../../../../usecases/SaveSmb';
import { PostgresSmbRepository } from '../../../gateways/repositories/postgres/PostgresSmbRepository';
import { SystemDateTimeRepository } from '../../../gateways/repositories/SystemDateTimeRepository';
import { Components } from '../typings/schema';
import { Service, ServiceResponse } from './Service';
import { GetTechHubYokohama } from '../../../../usecases/coWorkingSpace/getTechHubYokohama';
import { SmbSubRoleEnum } from '../../../../domains/Smb';
import { IllegalStateError } from '../../../../usecases/errors/IllegalStateError';

import SmbBody = Components.Schemas.SmbBody;

export const getSmbsGET = async (input: { authorization: string; amoId: string }): Promise<ServiceResponse> => {
    try {
        const usecase = new GetSmbs(new PostgresSmbRepository());
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const result = await usecase.execute(input.amoId, loggedInUser);

        return Service.successResponse(result);
    } catch (e: any) {
        return Service.errorResponse(e);
    }
};

export const getSmbById = async (input: { authorization: string; smbId: string }): Promise<ServiceResponse> => {
    try {
        const usecase = new GetSmb(new PostgresSmbRepository());
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

export const updateSmb = async (input: {
    smbId: string;
    authorization: string;
    smbBody: SmbBody;
}): Promise<ServiceResponse> => {
    try {
        const usecase = new SaveSmb(new SystemDateTimeRepository(), new PostgresSmbRepository());
        const loggedInUser = await Service.loggedInUser(input.authorization);

        //check subRole is valid enum type or not
        if (input.smbBody.subRole && !Object.values(SmbSubRoleEnum).find((value) => value === input.smbBody.subRole)) {
            throw new IllegalStateError(`Invalid Smb subRole: ${input.smbBody.subRole}`);
        }

        await usecase.execute(
            {
                smbId: input.smbId,
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

export const getTheSeatHalkiSmb = async (): Promise<ServiceResponse> => {
    try {
        const usecase = new GetTheSeatHalkiSmb(new PostgresSmbRepository());
        const res = await usecase.execute();
        return Service.successResponse(res);
    } catch (e: any) {
        if (e instanceof NotFoundError) {
            return Service.errorResponse(e, 404);
        }
        return Service.errorResponse(e);
    }
};

export const getTechHubYokohama = async (): Promise<ServiceResponse> => {
    try {
        const usecase = new GetTechHubYokohama(new PostgresSmbRepository());
        const res = await usecase.execute();
        return Service.successResponse(res);
    } catch (e: any) {
        if (e instanceof NotFoundError) {
            return Service.errorResponse(e, 404);
        }
        return Service.errorResponse(e);
    }
};
