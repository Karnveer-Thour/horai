import axios from 'axios';
import { genSalt, hash } from 'bcrypt';
import { IllegalStateError } from '../../../usecases/errors/IllegalStateError';
import { NotFoundError } from '../../../usecases/errors/NotFoundError';
import { UnauthorizedError } from '../../../usecases/errors/UnauthorizedError';

import { RestClientCallError } from '../errors/RestClientCallError';

export class RestClientUtilities {
    static async makeRestClientCallWithSecretHeader<T>(
        method: RestClientMethodEnum,
        url: string,
        config: any,
        body?: any,
    ) {
        try {
            const internalHeaderKey = process.env.HORAI_INTERNAL_HEADER_SECRET_KEY || 'youneverknow';
            const salt = await genSalt();
            const hashedKey = await hash(internalHeaderKey, salt);
            const headers = config?.header
                ? { ...config.header, xsecretrequestkey: hashedKey, Authorization: 'Bearer empty' }
                : {
                      xsecretrequestkey: hashedKey,
                      Authorization: 'Bearer empty',
                  };
            const res: T = await axios.request({
                ...config,
                headers,
                url,
                method,
                data: body,
            });
            return res;
        } catch (e: any) {
            console.log(`MakeRestClientCall ${url}, ${method} error: `, e);
            if (e.response?.status == 400) {
                throw new IllegalStateError(e.response.message);
            } else if (e.response?.status == 401) {
                throw new UnauthorizedError(e.response.message);
            } else if (e.response?.status == 404) {
                throw new NotFoundError(e.response.message);
            } else {
                throw RestClientCallError.model(url, method);
            }
        }
    }
}
export enum RestClientMethodEnum {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}
