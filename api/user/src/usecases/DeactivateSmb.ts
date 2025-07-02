import { LoggedInUser } from '../domains/LoggedInUser';
import { Smb } from '../domains/Smb';
import { NotFoundError } from './errors/NotFoundError';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { SmbRepository } from './repositories/SmbRepository';

export class DeactivateSmb {
    constructor(readonly dateTimeRepository: DateTimeRepository, readonly smbRepository: SmbRepository) {}

    public execute = async (input: Pick<Smb, 'smbId'> & { isActive: boolean }, user?: LoggedInUser): Promise<void> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }
        const savedAmo = await this.smbRepository.findById(input.smbId);
        if (!savedAmo) {
            throw new NotFoundError(`Smb not found for id: ${input.smbId}`);
        }
        const now = this.dateTimeRepository.now();
        const updatedSmb = savedAmo.updateStatus(input.isActive, now);

        await this.smbRepository.save(updatedSmb);
    };
}
