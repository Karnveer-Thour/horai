import { ActCastRepository } from './repositories/ActCast';
import { CongestioninsightResponse, DxCoreRepository } from './repositories/DxCoreRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import { EmiPeopleCounterHeadRepository } from './repositories/EmiPeopleCounterHead';

// import moment from 'moment';
import * as uuid from 'uuid';
import { EmiPeopleCounterHeadCrossRepository } from './repositories/EmiPeopleCounterHeadCross';
import { CongestioninsightRepository } from './repositories/CongestioninsightRepository';
import moment from 'moment-timezone';
export class HandleWeeklyCronJob {
    actCastRepository: ActCastRepository;
    dxCoreRepository: DxCoreRepository;
    emiPeopleCounterHeadRepository: EmiPeopleCounterHeadRepository;
    emiPeopleCounterHeadCrossRepository: EmiPeopleCounterHeadCrossRepository;
    dateTimeRepository: DateTimeRepository;
    congestioninsightRepositoryRepository: CongestioninsightRepository;

    constructor(
        actCastRepository: ActCastRepository,
        dxCoreRepository: DxCoreRepository,
        emiPeopleCounterHeadRepository: EmiPeopleCounterHeadRepository,
        emiPeopleCounterHeadCrossRepository: EmiPeopleCounterHeadCrossRepository,
        dateTimeRepository: DateTimeRepository,
        congestioninsightRepositoryRepository: CongestioninsightRepository,
    ) {
        this.actCastRepository = actCastRepository;
        this.dxCoreRepository = dxCoreRepository;
        this.emiPeopleCounterHeadRepository = emiPeopleCounterHeadRepository;
        this.emiPeopleCounterHeadCrossRepository = emiPeopleCounterHeadCrossRepository;
        this.dateTimeRepository = dateTimeRepository;
        this.congestioninsightRepositoryRepository = congestioninsightRepositoryRepository;
    }

    public execute = async () => {
        try {
            // last week
            // const from = moment()
            //     .add(-1, 'week')
            //     .startOf('week')
            //     .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            //     .format('YYYY-MM-DDTHH:mm:ss+09:00');

            // const to = moment()
            //     .add(-1, 'week')
            //     .endOf('week')
            //     .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
            //     .format('YYYY-MM-DDTHH:mm:ss+09:00');
            // set for 10 mins.
            // Calculate the start time (10 minutes ago)

            // Calculate the start time (10 minutes ago in UTC, then convert to JST)
            const from = moment
                .utc()
                .subtract(10, 'minutes')
                .set({ second: 0, millisecond: 0 }) // Set seconds and milliseconds to 0
                .tz('Asia/Tokyo') // Convert UTC time to JST (Asia/Tokyo)
                .format('YYYY-MM-DDTHH:mm:ss+09:00'); // Format in JST with +09:00 indicator

            // Calculate the end time (current time in UTC, then convert to JST)
            const to = moment
                .utc()
                .set({ second: 59, millisecond: 999 }) // Set seconds and milliseconds to end of current minute
                .tz('Asia/Tokyo') // Convert UTC time to JST (Asia/Tokyo)
                .format('YYYY-MM-DDTHH:mm:ss+09:00');

            console.log('dxcore time interval', { from, to });
            const dxCoreToken1 = await this.dxCoreRepository.getTokenForDxCoreApi();
            const dxCoreToken2 = await this.dxCoreRepository.getTokenForDxCoreApi('stg');

            new Promise((resolve, reject) =>
                this.dxCoreDataApis(resolve, reject, from, to, dxCoreToken1.access_token, dxCoreToken2.access_token),
            );
            return true;
        } catch (error) {
            throw error;
        }
    };

    public dxCoreDataApis = async (
        resolve: any,
        reject: any,
        from: string,
        to: string,
        dxCoreToken1: string,
        dxCoreToken2: string,
    ) => {
        const getActCastData = await this.dxCoreRepository.getActCastData('shintora', dxCoreToken1, from, to);
        await Promise.allSettled([
            getActCastData && getActCastData.length ? this.actCastRepository.saveBulk(getActCastData) : 'null',
        ]).then((results) => {
            console.log('succcess actcast', results);
            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    reject(result.reason);
                    console.error(`Bulk save operation ${index + 1} failed actcast:`, result.reason);
                } else if (result.status === 'fulfilled') {
                    resolve('success actcast');
                }
            });
        });

        const emiPeopleCounterHeadResponse = await this.dxCoreRepository.getEmiPeopleCounterHeadData(
            'shintora',
            dxCoreToken1,
            from,
            to,
        );
        await Promise.allSettled([
            emiPeopleCounterHeadResponse && emiPeopleCounterHeadResponse.length
                ? this.emiPeopleCounterHeadRepository.saveBulk(emiPeopleCounterHeadResponse)
                : 'null',
        ]).then((results) => {
            console.log('succcess emiPeopleCounterHead', results);
            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    reject(result.reason);
                    console.error(`Bulk save operation ${index + 1} failed emiPeopleCounterHead:`, result.reason);
                } else if (result.status === 'fulfilled') {
                    resolve('success emiPeopleCounterHead');
                }
            });
        });

        const emiPeopleCounterHeadCrossResponse = await this.dxCoreRepository.getEmiPeopleCounterHeadCrossData(
            'shintora',
            dxCoreToken1,
            from,
            to,
        );
        await Promise.allSettled([
            emiPeopleCounterHeadCrossResponse && emiPeopleCounterHeadCrossResponse.length
                ? this.emiPeopleCounterHeadCrossRepository.saveBulk(emiPeopleCounterHeadCrossResponse)
                : 'null',
        ]).then((results) => {
            console.log('succcess emiPeopleCounterHeadCross', results);
            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    reject(result.reason);
                    console.error(`Bulk save operation ${index + 1} failed emiPeopleCounterHeadCross:`, result.reason);
                } else if (result.status === 'fulfilled') {
                    resolve('success emiPeopleCounterHeadCross');
                }
            });
        });

        const getCongestioninsightResponse = await this.dxCoreRepository.getCongestioninsight(
            'stg',
            dxCoreToken2,
            from,
            to,
        );
        console.log('getCongestioninsightResponse', getCongestioninsightResponse.length);
        await Promise.allSettled([
            getCongestioninsightResponse && getCongestioninsightResponse.length
                ? this.congestioninsightRepositoryRepository.saveBulk(getCongestioninsightResponse)
                : null,
        ]).then((results) => {
            console.log('succcess getCongestioninsight', results);
            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    reject(result.reason);
                    console.error(`Bulk save operation ${index + 1} failed getCongestioninsight:`, result.reason);
                } else if (result.status === 'fulfilled') {
                    resolve('success getCongestioninsight');
                }
            });
        });
    };
}
