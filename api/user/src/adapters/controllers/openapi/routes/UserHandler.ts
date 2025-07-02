import { Service, ServiceResponse } from './Service';
import { GetUsers } from '../../../../usecases/GetUsers';
import { PostgresUserRepository } from '../../../gateways/repositories/postgres/PostgresUserRepository';
import { DeleteUser } from '../../../../usecases/DeleteUser';
import { GetUser } from '../../../../usecases/GetUser';
import { UpdateUser } from '../../../../usecases/UpdateUser';
import { SystemDateTimeRepository } from '../../../gateways/repositories/SystemDateTimeRepository';
import { SaveUser } from '../../../../usecases/SaveUser';
import { UserUpdateDTO } from '../../../../domains/dtos/UserUpdateDTO';
import { Components } from '../typings/schema';
import UserBody = Components.Schemas.UserBody;

export const listUsers = async (input: {
    authorization: string;
    startIndex: number;
    endIndex: number;
}): Promise<ServiceResponse> => {
    try {
        const usecase = new GetUsers(new PostgresUserRepository());
        const result = await usecase.execute(input.startIndex, input.endIndex);
        return Service.successResponse(result);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const userDELETE = async (input: { authorization: string; email: string }): Promise<ServiceResponse> => {
    try {
        const usecase = new DeleteUser(new PostgresUserRepository());
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const user = await usecase.execute(input.email, loggedInUser);
        return Service.successResponse(user);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const updateUser = async (input: {
    email: string;
    authorization: string;
    userBody: UserUpdateDTO;
}): Promise<ServiceResponse> => {
    try {
        const usecase = new UpdateUser(new SystemDateTimeRepository(), new PostgresUserRepository());
        const loggedInUser = await Service.loggedInUser(input.authorization);
        const user = await usecase.execute(
            {
                email: input.email,
                role: input.userBody.role,
                amoId: input.userBody.amoId,
                smbId: input.userBody.smbId,
                userId: input.userBody.userId,
            },
            loggedInUser,
        );
        return Service.successResponse(user, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const getUser = async (input: { authorization: string; email: string }) => {
    try {
        const usecase = new GetUser(new PostgresUserRepository());
        const user = await usecase.execute(input.email);
        return Service.successResponse(user, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const createUser = async (input: {
    email: string;
    authorization: string;
    userBody: UserBody;
}): Promise<ServiceResponse> => {
    try {
        const usecase = new SaveUser(new SystemDateTimeRepository(), new PostgresUserRepository());
        const loggedInUser = await Service.loggedInUser(input.authorization);
        await usecase.execute(
            {
                email: input.email,
                role: input.userBody.role,
                amoId: input.userBody.amoId,
                smbId: input.userBody.smbId,
                userId: input.userBody.userId,
            },
            loggedInUser,
        );

        return Service.successResponse({}, 204);
    } catch (e) {
        return Service.errorResponse(e);
    }
};
