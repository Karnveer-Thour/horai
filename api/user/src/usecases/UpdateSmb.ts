import { LoggedInUser } from '../domains/LoggedInUser';
import { Smb, SmbUpdatableField } from '../domains/Smb';
import { NotFoundError } from './errors/NotFoundError';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { SmbRepository } from './repositories/SmbRepository';

export class UpdateSmb {
    constructor(readonly dateTimeRepository: DateTimeRepository, readonly smbRepository: SmbRepository) {}

    public execute = async (input: Pick<Smb, 'smbId'> & SmbUpdatableField, user?: LoggedInUser): Promise<void> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }
        const savedSmb = await this.smbRepository.findById(input.smbId);
        if (!savedSmb) {
            throw new NotFoundError(`Smb not found for id: ${input.smbId}`);
        }
        const now = this.dateTimeRepository.now();
        const smb = savedSmb.update(input, now);
        await this.smbRepository.save(smb);
    };
}
