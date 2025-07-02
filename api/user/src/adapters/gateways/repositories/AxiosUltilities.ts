import axios from 'axios';
import { IllegalStateError } from '../../../usecases/errors/IllegalStateError';
import { NotFoundError } from '../../../usecases/errors/NotFoundError';
import { UnauthorizedError } from '../../../usecases/errors/UnauthorizedError';
import { RestClientCallError } from '../errors/RestClientCallError';

export class AxiosUtilities {
    static async makeRestClientCallWithToken<T>(
        method: RestClientMethodEnum,
        url: string,
        token: string,
        config?: any,
        body?: any,
    ): Promise<T> {
        try {
            const headers = config?.headers
                ? { ...config.headers, Authorization: `Bearer ${token}` }
                : { Authorization: `Bearer ${token}` };
            const res = await axios.request<T>({
                ...config,
                headers,
                url,
                method,
                data: body,
            });
            return res.data;
        } catch (e: any) {
            console.log(`MakeRestClientCall ${url}, ${method} error: `, e);
            if (e.response?.status === 400) {
                throw new IllegalStateError(e.response.data.message);
            } else if (e.response?.status === 401) {
                throw new UnauthorizedError(e.response.data.message);
            } else if (e.response?.status === 404) {
                throw new NotFoundError(e.response.data.message);
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
