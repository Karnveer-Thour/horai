import { Congestioninsight } from '../../domains/Congestioninsight';
import { CongestioninsightListDTO } from '../../domains/dtos/CongestioninsightListDTO ';
import { CongestioninsightResponse } from './DxCoreRepository';

export interface CongestioninsightRepository {
    getAll(startIndex?: number, endIndex?: number): Promise<CongestioninsightListDTO>;
    save(emiPeopleCounterHeadCross: Congestioninsight): Promise<void>;
    saveBulk(user: CongestioninsightResponse[]): Promise<void>;
    findById(actCastId: string): Promise<Congestioninsight | undefined>;
}
