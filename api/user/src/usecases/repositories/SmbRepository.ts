import { Smb } from '../../domains/Smb';

export interface SmbRepository {
    save(smb: Smb): Promise<void>;
    findById(id: string): Promise<Smb | undefined>;
    getAll(): Promise<Smb[]>;
    getAllByAmoId(amoId: string): Promise<Smb[]>;
    findByAmoId(amoId: string): Promise<Smb | undefined>;
}
