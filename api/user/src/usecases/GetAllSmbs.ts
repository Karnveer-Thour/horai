import { LoggedInUser } from '../domains/LoggedInUser';
import { Smb } from '../domains/Smb';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { SmbRepository } from './repositories/SmbRepository';

export class GetAllSmbs {
    constructor(readonly smbRepository: SmbRepository) {}

    public execute = async (user?: LoggedInUser): Promise<Smb[]> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }
        const smbs = await this.smbRepository.getAll();

        return smbs;
    };
}
