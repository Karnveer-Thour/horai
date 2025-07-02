import { Amo } from '../../domains/Amo';
import { Report } from '../../domains/Report';
import { Smb } from '../../domains/Smb';
import { User } from '../../domains/User';

export interface DataSourceRepository {
    getUsers(): Promise<User[]>;
    getAmos(): Promise<Amo[]>;
    getReports(): Promise<Report[]>;
    getSmbs(): Promise<Smb[]>;
}
