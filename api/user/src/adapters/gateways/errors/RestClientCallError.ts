import { RestClientMethodEnum } from '../repositories/RestClientUltilities';

export class RestClientCallError extends Error {
    public static model = (url: string, method: RestClientMethodEnum): RestClientCallError =>
        new RestClientCallError(`Calling ${url} is failed. Method: ${method}`);
}
