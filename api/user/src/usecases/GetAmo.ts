import { Amo } from '../domains/Amo';
import { LoggedInUser } from '../domains/LoggedInUser';
import { NotFoundError } from './errors/NotFoundError';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { AmoRepository } from './repositories/AmoRepository';

export class GetAmo {
    constructor(readonly amoRepository: AmoRepository) {}

    public execute = async (input: Pick<Amo, 'amoId'>, user?: LoggedInUser): Promise<Amo | undefined> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }

        const amo = await this.amoRepository.findById(input.amoId);
        if (!amo) {
            throw new NotFoundError(`Amo not found for id: ${input.amoId}`);
        }
        return amo;
    };
}
