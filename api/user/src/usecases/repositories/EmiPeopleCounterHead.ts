import { EmiPeopleCounterHead } from '../../domains/EmiPeopleCounterHead';
import { EmiPeopleCounterHeadListDTO } from '../../domains/dtos/EmiPeopleCounterHeadListDTO';
import { EmiPeopleCounterHeadApiResponse } from './DxCoreRepository';

export interface EmiPeopleCounterHeadRepository {
    getAll(startIndex?: number, endIndex?: number): Promise<EmiPeopleCounterHeadListDTO>;
    save(emiPeopleCounterHead: EmiPeopleCounterHead): Promise<void>;
    saveBulk(user: EmiPeopleCounterHeadApiResponse[]): Promise<void>;
    findById(actCastId: string): Promise<EmiPeopleCounterHead | undefined>;
}
