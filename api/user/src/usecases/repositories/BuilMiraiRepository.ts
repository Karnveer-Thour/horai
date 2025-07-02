export interface BuilMiraiTokenApiResponse {
    token_type: string;
    scope: string;
    expires_in: number;
    ext_expires_in: number;
    access_token: string;
    refresh_token: string;
}

export interface BuilMiraiDeviceApiResponse {
    deviceId: string;
    messages: {
        messageId: string;
        eventDate: Date;
        deviceType: string;
        dataType: string;
        messageType: string;
        value: string;
        unit: string;
        errorFlg: boolean;
        dataReceiveDate: Date;
        createdon: Date;
    }[];
}

export interface BuilMiraiRepository {
    getTokenForBullMirai(): Promise<BuilMiraiTokenApiResponse>;
    getBullMiraiDeviceData(
        authToken: string,
        searchingObj: {
            device_ids: string[];
            count: number;
            from: Date;
            to: Date;
            last_opt: boolean;
            search_cond: number;
        },
    ): Promise<BuilMiraiDeviceApiResponse[]>;
}
