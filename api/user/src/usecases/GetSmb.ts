import { ActivitySmbDTO } from '../domains/dtos/ActivitySmbDTO';
import { LoggedInUser } from '../domains/LoggedInUser';
import { NotFoundError } from './errors/NotFoundError';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { SmbRepository } from './repositories/SmbRepository';
export class GetSmb {
    constructor(readonly smbRepository: SmbRepository) {}

    public execute = async (smbId: string, user?: LoggedInUser): Promise<ActivitySmbDTO> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }
        const smbItem = await this.smbRepository.findById(smbId);
        if (!smbItem) throw NotFoundError.model(`smbItem`, `smbItemId`, smbId);
        return smbItem.toActivityDTO();
    };
}
