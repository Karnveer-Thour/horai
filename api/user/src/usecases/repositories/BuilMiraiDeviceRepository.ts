import { BuilMiraiDevice } from '../../domains/BuilMiraiDevice';

export interface BuilMiraiDeviceRepository {
    save(data: BuilMiraiDevice): Promise<void>;
    saveBulk(data: BuilMiraiDevice[]): Promise<void>;
    findById(id: string): Promise<BuilMiraiDevice | undefined>;
    getAll(): Promise<BuilMiraiDevice[]>;
}
