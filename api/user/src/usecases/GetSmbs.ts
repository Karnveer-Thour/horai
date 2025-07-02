import { ActivitySmbDTO } from '../domains/dtos/ActivitySmbDTO';
import { LoggedInUser } from '../domains/LoggedInUser';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { SmbRepository } from './repositories/SmbRepository';

export class GetSmbs {
    constructor(readonly smbRepository: SmbRepository) {}

    public execute = async (amoId: string, user?: LoggedInUser): Promise<ActivitySmbDTO[]> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }
        const smbs = await this.smbRepository.getAllByAmoId(amoId);
        return smbs?.length ? smbs.map((item) => item.toActivityDTO()) : [];
    };
}
