import { Amo } from '../domains/Amo';
import { LoggedInUser } from '../domains/LoggedInUser';
import { NotFoundError } from './errors/NotFoundError';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { AmoRepository } from './repositories/AmoRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';

export class UpdateAmoStatus {
    constructor(readonly dateTimeRepository: DateTimeRepository, readonly amoRepository: AmoRepository) {}

    public execute = async (input: Pick<Amo, 'amoId'> & { isActive: boolean }, user?: LoggedInUser): Promise<void> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }
        const savedAmo = await this.amoRepository.findById(input.amoId);
        if (!savedAmo) {
            throw new NotFoundError(`Amo not found for id: ${input.amoId}`);
        }
        const now = this.dateTimeRepository.now();
        const updatedAmo = savedAmo.updateStatus(input.isActive, now);

        await this.amoRepository.save(updatedAmo);
    };
}
