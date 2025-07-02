import { EmiPeopleCounterHeadCross } from '../../domains/EmiPeopleCounterHeadCross';
import { EmiPeopleCounterHeadCrossListDTO } from '../../domains/dtos/EmiPeopleCounterHeadCrossListDTO';
import { EmiPeopleCounterHeadCrossApiResponse } from './DxCoreRepository';

export interface EmiPeopleCounterHeadCrossRepository {
    getAll(startIndex?: number, endIndex?: number): Promise<EmiPeopleCounterHeadCrossListDTO>;
    save(emiPeopleCounterHeadCross: EmiPeopleCounterHeadCross): Promise<void>;
    saveBulk(user: EmiPeopleCounterHeadCrossApiResponse[]): Promise<void>;
    findById(actCastId: string): Promise<EmiPeopleCounterHeadCross | undefined>;
}
