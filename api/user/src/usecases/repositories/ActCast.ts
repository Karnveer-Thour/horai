import { ActCast } from '../../domains/ActCast';
import { ActCastListDTO } from '../../domains/dtos/ActCastListDTO';
import { ActCastApiResponse } from './DxCoreRepository';

export interface ActCastRepository {
    getAll(startIndex?: number, endIndex?: number): Promise<ActCastListDTO>;
    save(user: ActCast): Promise<void>;
    saveBulk(user: ActCastApiResponse[]): Promise<void>;
    findById(actCastId: string): Promise<ActCast | undefined>;
    // softDeleteById(actCastWalkerInSightId: string): Promise<ActCast>;
}
