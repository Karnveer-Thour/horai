import { injectable } from 'inversify';
import {
    BuilMiraiDeviceApiResponse,
    BuilMiraiRepository,
    BuilMiraiTokenApiResponse,
} from '../../../../usecases/repositories/BuilMiraiRepository';
import { RestClientMethodEnum } from '../RestClientUltilities';
import { AxiosUtilities } from '../AxiosUltilities';
import qs from 'qs';
import { IllegalStateError } from '../../../../usecases/errors/IllegalStateError';
const bull_mirai_token_api_endpoint = process.env.BULL_MIRAI_TOKEN_API_URL || '';
const bull_mirai_device_api_endpoint = process.env.BULL_MIRAI_DEVICE_API_URL || '';

const bull_mirai_grant_type = process.env.BULL_MIRAI_GRANT_TYPE || '';
const bull_mirai_client_id = process.env.BULL_MIRAI_CLIENT_ID || '';
const bull_mirai_client_secret = process.env.BULL_MIRAI_CLIENT_SECRET || '';
const bull_mirai_scope = process.env.BULL_MIRAI_SCOPE || '';
const bull_mirai_username = process.env.BULL_MIRAI_USERNAME || '';
const bull_mirai_password = process.env.BULL_MIRAI_PASSWORD || '';

@injectable()
export class BuilMiraiRepositoryImpl implements BuilMiraiRepository {
    public getTokenForBullMirai = async (): Promise<BuilMiraiTokenApiResponse> => {
        const builMiraiCreds = {
            grant_type: bull_mirai_grant_type,
            client_id: bull_mirai_client_id,
            client_secret: bull_mirai_client_secret,
            scope: bull_mirai_scope,
            username: bull_mirai_username,
            password: bull_mirai_password,
        };
        //validate buil mirai env values
        this.validateBuilMiraiCreds(builMiraiCreds);

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const data = qs.stringify(builMiraiCreds);
        try {
            const res: any = await AxiosUtilities.makeRestClientCallWithToken<any>(
                RestClientMethodEnum.POST,
                `${bull_mirai_token_api_endpoint}`,
                '', // No token needed for this request
                headers,
                data,
            );
            if (!res) throw Error('Failed to fetch token!');
            return res;
        } catch (error) {
            console.error('Error fetching token:', error);
            throw error;
        }
    };

    public getBullMiraiDeviceData = async (
        authToken: string,
        searchingObj: {
            device_ids: string[];
            count: number;
            from: Date;
            to: Date;
            last_opt: boolean;
            search_cond: number;
        },
    ): Promise<BuilMiraiDeviceApiResponse[]> => {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };

            const res: any = await AxiosUtilities.makeRestClientCallWithToken<any>(
                RestClientMethodEnum.POST,
                `${bull_mirai_device_api_endpoint}`,
                authToken,
                { headers: headers },
                searchingObj,
            );
            if (!res || (res && !res.devices)) return [];
            return res.devices;
        } catch (error) {
            throw error;
        }
    };

    private validateBuilMiraiCreds = (credObj: {
        grant_type: string;
        client_id: string;
        client_secret: string;
        scope: string;
        username: string;
        password: string;
    }) => {
        for (const key in credObj) {
            const value = credObj[key as keyof typeof credObj]; // Ensure proper type safety
            if (value === '') {
                throw new IllegalStateError(`Invalid Env key value for ${key}: ${value}`);
            }
        }
    };
}
