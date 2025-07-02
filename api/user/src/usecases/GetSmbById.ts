import { LoggedInUser } from '../domains/LoggedInUser';
import { Smb } from '../domains/Smb';
import { NotFoundError } from './errors/NotFoundError';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { SmbRepository } from './repositories/SmbRepository';
export class GetSmbById {
    constructor(readonly smbRepository: SmbRepository) {}

    public execute = async (smbId: string, user?: LoggedInUser): Promise<Smb> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }

        const smbItem = await this.smbRepository.findById(smbId);
        if (!smbItem) throw NotFoundError.model(`smbItem`, `smbItemId`, smbId);

        return smbItem;
    };
}
