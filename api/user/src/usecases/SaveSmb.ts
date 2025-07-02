import * as uuid from 'uuid';
import { LoggedInUser } from '../domains/LoggedInUser';
import { Smb, SmbUpdatableField } from '../domains/Smb';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { SmbRepository } from './repositories/SmbRepository';

export class SaveSmb {
    constructor(readonly dateTimeRepository: DateTimeRepository, readonly smbRepository: SmbRepository) {}

    public execute = async (
        input: Pick<Smb, 'smbId' | 'amoId' | 'resourceType' | 'isActive'> & SmbUpdatableField,
        user?: LoggedInUser,
    ): Promise<void> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }
        const savedSmb = await this.smbRepository.findById(input.smbId);
        const now = this.dateTimeRepository.now();
        const smb = savedSmb
            ? savedSmb.update(input, now)
            : Smb.create(input.smbId, input.amoId, input.resourceType, input, input.isActive, now);
        await this.smbRepository.save(smb);
    };
}

export class SaveNewSmb {
    dateTimeRepository: DateTimeRepository;
    smbRepository: SmbRepository;

    constructor(dateTimeRepository: DateTimeRepository, smbRepository: SmbRepository) {
        this.dateTimeRepository = dateTimeRepository;
        this.smbRepository = smbRepository;
    }

    public execute = async (
        input: Pick<Smb, 'amoId' | 'resourceType' | 'isActive'> & SmbUpdatableField,
        user?: LoggedInUser,
    ): Promise<void> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }
        const smbId = uuid.v4();
        const now = this.dateTimeRepository.now();
        const smb = Smb.create(smbId, input.amoId, input.resourceType, input, input.isActive, now);
        await this.smbRepository.save(smb);
    };
}
