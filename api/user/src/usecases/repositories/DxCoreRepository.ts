export interface ActCastApiResponse {
    device_id: string;
    timestamp: string;
    line_id: number;
    forward: number;
    backward: number;
}

export interface EmiPeopleCounterHeadApiResponse {
    camera_id: string;
    timestamp: string;
    people_count: number;
    area_name: string;
    send_trigger: number;
}

export interface EmiPeopleCounterHeadCrossApiResponse {
    uuid: string;
    timestamp: string;
    timestamp_from: string;
    line_id: string;
    into_inside: number;
    count: number;
    elapsed_seconds: number;
}

export interface CongestioninsightResponse {
    uuid: string;
    timestamp: string;
    device_id: string;
    count: number;
}

export interface DxCoreRepository {
    getTokenForDxCoreApi(type?: string): Promise<any>;
    getActCastData(sitename: string, authToken: string, start: string, end: string): Promise<ActCastApiResponse[]>;
    getEmiPeopleCounterHeadData(
        sitename: string,
        authToken: string,
        start: string,
        end: string,
    ): Promise<EmiPeopleCounterHeadApiResponse[]>;
    getEmiPeopleCounterHeadCrossData(
        sitename: string,
        authToken: string,
        start: string,
        end: string,
    ): Promise<EmiPeopleCounterHeadCrossApiResponse[]>;
    getCongestioninsight(
        sitename: string,
        authToken: string,
        start: string,
        end: string,
    ): Promise<CongestioninsightResponse[]>;
}
