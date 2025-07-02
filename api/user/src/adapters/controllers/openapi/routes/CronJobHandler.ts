import { Service, ServiceResponse } from './Service';
import { HandleWeeklyCronJob } from '../../../../usecases/HandleWeeklyCronJob';
import {
    actCastRepository,
    dateTimeRepository,
    dxCoreRepository,
    emiPeopleCounterHeadCrossRepository,
    emiPeopleCounterHeadRepository,
    congestioninsightRepositoryRepository,
    builMiraiRepository,
    builMiraiDeviceRepository,
} from '../../../../infrastructures/config/IoC/inversify.config';
import { HandleDailyCronJob } from '../../../../usecases/HandleDailyCronJob';
import moment from 'moment';
import { IllegalStateError } from '../../../../usecases/errors/IllegalStateError';

export const addDxCoreData = async (): Promise<ServiceResponse> => {
    try {
        const usecase = new HandleWeeklyCronJob(
            actCastRepository,
            dxCoreRepository,
            emiPeopleCounterHeadRepository,
            emiPeopleCounterHeadCrossRepository,
            dateTimeRepository,
            congestioninsightRepositoryRepository,
        );
        await usecase.execute();
        return Service.successResponse({ success: true, message: 'OK' }, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};

export const addBuilMiraiDeviceData = async (input: { fromDate: string; toDate: string }): Promise<ServiceResponse> => {
    try {
        //check fromDate and toDate is valid or not
        if (input.fromDate && input.toDate) {
            if (!moment(input.fromDate, moment.ISO_8601, true).isValid() || !input.fromDate.includes('Z')) {
                throw new IllegalStateError(`Invalid fromDate: ${input.fromDate}`);
            }
            if (!moment(input.toDate, moment.ISO_8601, true).isValid() || !input.toDate.includes('Z')) {
                throw new IllegalStateError(`Invalid toDate: ${input.toDate}`);
            }
        }

        const usecase = new HandleDailyCronJob(builMiraiRepository, builMiraiDeviceRepository, dateTimeRepository);
        await usecase.execute({
            searchingObj: input.fromDate && input.toDate ? { from: input.fromDate, to: input.toDate } : undefined,
        });
        return Service.successResponse({ success: true, message: 'OK' }, 200);
    } catch (e) {
        return Service.errorResponse(e);
    }
};
