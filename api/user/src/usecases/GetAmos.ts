import { Amo } from '@prisma/client';
import { LoggedInUser } from '../domains/LoggedInUser';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { AmoRepository } from './repositories/AmoRepository';

export class GetAmos {
    constructor(readonly amoRepository: AmoRepository) {}

    public execute = async (user?: LoggedInUser): Promise<Amo[]> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }
        const amos = await this.amoRepository.getAll();
        console.log(JSON.stringify(amos));
        return amos;
    };
}
