import { Amo } from '../domains/Amo';
import { LoggedInUser } from '../domains/LoggedInUser';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { AmoRepository } from './repositories/AmoRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';

export class SaveAmo {
    constructor(readonly dateTimeRepository: DateTimeRepository, readonly amoRepository: AmoRepository) {}

    public execute = async (input: Pick<Amo, 'amoId' | 'email' | 'name'>, user?: LoggedInUser): Promise<void> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }

        const now = this.dateTimeRepository.now();
        const amo = Amo.create(input.amoId, { email: input.email, name: input.name, isActive: true }, now);
        await this.amoRepository.save(amo);
    };
}
