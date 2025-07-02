import { Amo, AmoUpdatableField } from '../domains/Amo';
import { LoggedInUser } from '../domains/LoggedInUser';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { AmoRepository } from './repositories/AmoRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';

export class SaveAmo {
    constructor(readonly dateTimeRepository: DateTimeRepository, readonly amoRepository: AmoRepository) {}

    public execute = async (input: Pick<Amo, 'amoId'> & AmoUpdatableField, user?: LoggedInUser): Promise<void> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }
        const savedAmo = await this.amoRepository.findById(input.amoId);
        const now = this.dateTimeRepository.now();
        const amo = savedAmo ? savedAmo.update(input, now) : Amo.create(input.amoId, input, now);
        await this.amoRepository.save(amo);
    };
}

export class GetAmo {
    dateTimeRepository: DateTimeRepository;
    amoRepository: AmoRepository;

    constructor(dateTimeRepository: DateTimeRepository, amoRepository: AmoRepository) {
        this.dateTimeRepository = dateTimeRepository;
        this.amoRepository = amoRepository;
    }

    public execute = async (input: Pick<Amo, 'amoId'>, user?: LoggedInUser): Promise<Amo | undefined> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }
        return await this.amoRepository.findById(input.amoId);
    };
}

export class GetAmos {
    amoRepository: AmoRepository;

    constructor(amoRepository: AmoRepository) {
        this.amoRepository = amoRepository;
    }

    public execute = async (user?: LoggedInUser): Promise<Amo[]> => {
        if (!user || !user.isSv()) {
            throw new UnauthorizedError();
        }
        const amos = await this.amoRepository.getAll();
        return amos;
    };
}
