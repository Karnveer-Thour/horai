import { Service, ServiceResponse } from './Service';
import { Components } from '../typings/schema';
import DeviceTokenBody = Components.Schemas.DeviceTokenBody;
import { UpdateUserDeviceToken } from '../../../../usecases/UpdateUserDeviceToken';
import { dateTimeRepository, userDeviceTokenRepository } from '../../../../infrastructures/config/IoC/inversify.config';
import { DeleteUserDeviceToken } from '../../../../usecases/DeleteUserDeviceToken';
import { ServiceType } from '../../../../domains/customer/CustomerEnum';

export const updateUserDeviceToken = async (input: {
    authorization: string;
    deviceTokenBody: DeviceTokenBody;
}): Promise<ServiceResponse> => {
    try {
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const usecase = new UpdateUserDeviceToken(dateTimeRepository, userDeviceTokenRepository);
        await usecase.execute(
            {
                deviceToken: input.deviceTokenBody.deviceToken,
                serviceType: input.deviceTokenBody.serviceType as ServiceType,
            },
            loggedInUser,
        );

        return Service.successResponse({}, 204);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const deleteUserDeviceToken = async (input: {
    authorization: string;
    deviceToken: string;
}): Promise<ServiceResponse> => {
    try {
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const usecase = new DeleteUserDeviceToken(userDeviceTokenRepository);
        const userDeviceToken = await usecase.execute(input.deviceToken, loggedInUser);
        return Service.successResponse(userDeviceToken);
    } catch (e) {
        return Service.errorResponse(e);
    }
};
