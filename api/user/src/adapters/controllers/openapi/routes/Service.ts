import { LoggedInUser } from '../../../../domains/LoggedInUser';
import { FirebaseAuthenticator } from '@scheme-verge-inc/firebase-authenticator';

import { UnauthorizedError } from '../../../../usecases/errors/UnauthorizedError';
import { IllegalStateError } from '../../../../usecases/errors/IllegalStateError';
import { NotFoundError } from '../../../../usecases/errors/NotFoundError';
import { PostgresUserRepository } from '../../../gateways/repositories/postgres/PostgresUserRepository';
import { FirebaseRepositoryImpl } from '../../../gateways/repositories/FirebaseRepositoryImpl';

import { RemoteConfigTemplate } from 'firebase-admin/lib/remote-config';

import { compare } from 'bcrypt';

export class Service {
    static andBiz_error_Response = (error: Error, errorCode?: string): ErrorResponse => {
        const errorMessage = error.message;
        let code = 500; // Default code

        switch (errorCode) {
            case 'ERR_CODE.E0001':
                code = 400;
                break;
            case 'ERR_CODE.E0002':
                code = 401;
                break;
            case 'ERR_CODE.E0003':
                code = 403;
                break;
            case 'ERR_CODE.E0004':
            case 'ERR_CODE.E0005':
            case 'ERR_CODE.E0006':
            case 'ERR_CODE.E0007':
            case 'ERR_CODE.E0008':
                code = 404;
                break;
            default:
                code = 500;
        }

        return {
            message: errorMessage,
            code: code,
        };
    };

    static errorResponse = (error: Error, code?: number): ErrorResponse => {
        const res = {
            message: error.message,
        };
        if (error instanceof IllegalStateError) {
            return { ...res, code: 400 };
        } else if (error instanceof UnauthorizedError) {
            return { ...res, code: 401 };
        } else if (error instanceof NotFoundError) {
            return { ...res, code: 404 };
        } else {
            return { ...res, code: code || 500 };
        }
    };

    static successResponse = (payload?: object, code = 200): Promise<SuccessResponse> =>
        Promise.resolve({ payload, code });
    static loggedInUser = async (authorization: string): Promise<LoggedInUser | undefined> => {
        const user = await new FirebaseAuthenticator().authenticate(authorization);
        if (!user) return;
        const loggedInUser = new LoggedInUser(user);
        const userRepo = new PostgresUserRepository();
        try {
            const userData = await userRepo.findById(user.email);
            if (userData) {
                loggedInUser.role = userData.role;
                loggedInUser.amoId = userData.amoId;
                loggedInUser.smbId = userData.smbId;
            }
        } catch (e) {
            console.log('Get user information failed: ', e);
        }
        return loggedInUser;
    };

    static verifyInternalHeader = async (headerSecretKey: string): Promise<void> => {
        const internalHeaderKey = process.env.HORAI_INTERNAL_HEADER_SECRET_KEY || 'youneverknow';
        try {
            const result = await compare(internalHeaderKey, headerSecretKey);
            if (!result) {
                throw new UnauthorizedError();
            }
        } catch (e) {
            throw new UnauthorizedError();
        }
    };
}

export type ErrorResponse = {
    message: string;
    code: number;
};
export type SuccessResponse = {
    payload?: object;
    code: number;
};

export type ServiceResponse = ErrorResponse | SuccessResponse;

export class FirebaseService {
    static getFeatureFlags = async (): Promise<RemoteConfigTemplate> => {
        const firebaseRepo = new FirebaseRepositoryImpl();
        return firebaseRepo.getFeatureFlags();
    };
    static checkFeatureFlag = async (flag: string): Promise<{ isAvailable: boolean; value: string | undefined }> => {
        const featureFlags = await FirebaseService.getFeatureFlags();
        if (featureFlags.parameters[flag]) {
            return {
                isAvailable: true,
                // @ts-ignore
                value: featureFlags.parameters[flag]['defaultValue']
                    ? // @ts-ignore
                      featureFlags.parameters[flag]['defaultValue']['value']
                    : 'false',
            };
        }

        return {
            isAvailable: false,
            value: 'false',
        };
    };
}
