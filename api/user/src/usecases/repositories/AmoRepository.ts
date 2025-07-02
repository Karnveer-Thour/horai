import { Amo } from '../../domains/Amo';

export interface AmoRepository {
    save(amo: Amo): Promise<void>;

    findById(id: string): Promise<Amo | undefined>;

    getAll(): Promise<Amo[]>;
}
