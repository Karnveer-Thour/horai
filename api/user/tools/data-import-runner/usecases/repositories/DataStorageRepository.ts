import { Amo } from '../../domains/Amo';
import { Report } from '../../domains/Report';
import { Smb } from '../../domains/Smb';
import { User } from '../../domains/User';

export interface DataStorageRepository {
    saveUser(row: User): Promise<void>;
    saveAmo(row: Amo): Promise<void>;
    saveReport(row: Report): Promise<void>;
    saveSmb(row: Smb): Promise<void>;
}
