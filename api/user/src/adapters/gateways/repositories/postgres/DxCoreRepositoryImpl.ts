import { injectable } from 'inversify';
import {
    ActCastApiResponse,
    DxCoreRepository,
    EmiPeopleCounterHeadApiResponse,
    EmiPeopleCounterHeadCrossApiResponse,
    CongestioninsightResponse,
} from '../../../../usecases/repositories/DxCoreRepository';
import { RestClientMethodEnum } from '../RestClientUltilities';
import { AxiosUtilities } from './../AxiosUltilities';
import qs from 'qs';
const dxCoreUrl = process.env.DX_CORE_API_URL || 'https://api.cloud-tky003.dx-core.jp';
const dxCoreUrl_stg = process.env.DX_CORE_API_URL_STG || 'https://cloud.stg.dx-core.jp';
const dxCore_grant_type = process.env.dxCore_grant_type || 'password';
const dxCore_client_id = process.env.dxCore_client_id || 'public_api';
const dxCore_client_secret = process.env.dxCore_client_secret || 'ef134c17-ba76-47ed-9fa4-e8ba224a9983';
const dxCore_username = process.env.dxCore_username || '1001';
const dxCore_password = process.env.dxCore_password || 'rRE8UeakArPf';
@injectable()
export class DxCoreRepositoryImpl implements DxCoreRepository {
    public getTokenForDxCoreApi = async (type?: string): Promise<any> => {
        const dxCoreCreds = {
            grant_type: dxCore_grant_type,
            client_id: dxCore_client_id,
            client_secret: dxCore_client_secret,
            username: dxCore_username,
            password: dxCore_password,
        };
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const data = qs.stringify(dxCoreCreds);
        try {
            let baseUrl = dxCoreUrl;
            if (type) {
                baseUrl = dxCoreUrl_stg;
            }
            const res: any = await AxiosUtilities.makeRestClientCallWithToken<any>(
                RestClientMethodEnum.POST,
                `${baseUrl}/api/public/generate-token`,
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

    public getActCastData = async (
        sitename: string,
        authToken: string,
        start: string,
        end: string,
    ): Promise<ActCastApiResponse[]> => {
        try {
            const res: any = await AxiosUtilities.makeRestClientCallWithToken<any>(
                RestClientMethodEnum.GET,
                `${dxCoreUrl}/api/public/v1/peopleflow/${sitename}/actcast/walkerinsight?start=${encodeURIComponent(
                    start,
                )}&end=${encodeURIComponent(end)}`,
                authToken,
            );
            if (!res || (res && !res.data)) throw Error('No data found !');
            return res.data;
        } catch (error) {
            return error;
        }
    };
    public getEmiPeopleCounterHeadData = async (
        sitename: string,
        authToken: string,
        start: string,
        end: string,
    ): Promise<EmiPeopleCounterHeadApiResponse[]> => {
        try {
            const res: any = await AxiosUtilities.makeRestClientCallWithToken<any>(
                RestClientMethodEnum.GET,
                `${dxCoreUrl}/api/public/v1/peopleflow/${sitename}/emi/aipeoplecounterhead?start=${encodeURIComponent(
                    start,
                )}&end=${encodeURIComponent(end)}`,
                authToken,
            );
            if (!res || (res && !res.data)) throw Error('No data found !');
            return res.data;
        } catch (error) {
            return error;
        }
    };
    public getEmiPeopleCounterHeadCrossData = async (
        sitename: string,
        authToken: string,
        start: string,
        end: string,
    ): Promise<EmiPeopleCounterHeadCrossApiResponse[]> => {
        try {
            const res: any = await AxiosUtilities.makeRestClientCallWithToken<any>(
                RestClientMethodEnum.GET,
                `${dxCoreUrl}/api/public/v1/peopleflow/${sitename}/emi/aipeoplecounterheadcross?start=${encodeURIComponent(
                    start,
                )}&end=${encodeURIComponent(end)}`,
                authToken,
            );
            if (!res || (res && !res.data)) throw Error('No data found !');
            return res.data;
        } catch (error) {
            return error;
        }
    };

    public getCongestioninsight = async (
        sitename: string,
        authToken: string,
        start: string,
        end: string,
    ): Promise<CongestioninsightResponse[]> => {
        try {
            const res: any = await AxiosUtilities.makeRestClientCallWithToken<any>(
                RestClientMethodEnum.GET,
                `${dxCoreUrl_stg}/api/public/v1/peopleflow/${sitename}/actcast/congestioninsight?start=${encodeURIComponent(
                    start,
                )}&end=${encodeURIComponent(end)}`,
                authToken,
            );
            if (!res || (res && !res.data)) throw Error('No data found !');
            return res.data;
        } catch (error) {
            return error;
        }
    };
}
