import { DateTimeRepository } from '../../../usecases/repositories/DateTimeRepository';
import { injectable } from 'inversify';

@injectable()
export class SystemDateTimeRepository implements DateTimeRepository {
    now = (): Date => new Date();
}
