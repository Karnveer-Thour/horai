import { BuilMiraiRepository } from './repositories/BuilMiraiRepository';
import { BuilMiraiDeviceRepository } from './repositories/BuilMiraiDeviceRepository';
import { DateTimeRepository } from './repositories/DateTimeRepository';
import * as uuid from 'uuid';
import moment from 'moment-timezone';
import { BuilMiraiDevice } from '../domains/BuilMiraiDevice';
export class HandleDailyCronJob {
    builMiraiRepository: BuilMiraiRepository;
    builMiraiDeviceRepository: BuilMiraiDeviceRepository;
    dateTimeRepository: DateTimeRepository;

    constructor(
        builMiraiRepository: BuilMiraiRepository,
        builMiraiDeviceRepository: BuilMiraiDeviceRepository,
        dateTimeRepository: DateTimeRepository,
    ) {
        this.builMiraiRepository = builMiraiRepository;
        this.builMiraiDeviceRepository = builMiraiDeviceRepository;
        this.dateTimeRepository = dateTimeRepository;
    }

    public execute = async (input: {
        searchingObj?: {
            from: string;
            to: string;
        };
    }) => {
        try {
            // Get Japan's midnight (start of the current day JST)
            const jstMidnight = moment().tz('Asia/Tokyo').startOf('day');

            // Move back one day to get the previous day
            let from = jstMidnight.clone().subtract(1, 'day').utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
            let to = jstMidnight.clone().subtract(1, 'second').utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

            //if from and to Date coming from the api params
            if (input.searchingObj?.from && input.searchingObj.to) {
                from = input.searchingObj.from;
                to = input.searchingObj.to;
            }

            console.log('builMiraiDevice time interval', { from, to });
            const builMiraiTokenApiResponse = await this.builMiraiRepository.getTokenForBullMirai();
            const buildMiraiDeviceDataResponse = await this.builMiraiRepository.getBullMiraiDeviceData(
                builMiraiTokenApiResponse.access_token,
                {
                    //@ts-ignore
                    from: from,
                    //@ts-ignore
                    to: to,
                    device_ids: [
                        'horai:stscore:peopleflow:B1,horai:stscore:peopleflow:2,horai:stscore:peopleflow:3,horai:stscore:peopleflow:4,horai:stscore:peopleflow:5,horai:stscore:peopleflow:6,horai:stscore:peopleflow:7,horai:stscore:peopleflow:8,horai:stscore:peopleflow:9,horai:stscore:peopleflow:10,horai:stscore:peopleflow:11,horai:stscore:peopleflow:12,horai:stscore:peopleflow:13,horai:stscore:peopleflow:14,horai:stscore:peopleflow:15',
                    ], // static device ids,
                    count: 2000,
                    last_opt: false,
                    search_cond: 0,
                },
            );

            const now = this.dateTimeRepository.now();
            const savedBuilMiraiDevicesData = buildMiraiDeviceDataResponse?.flatMap((item) =>
                item.messages.map((message) =>
                    BuilMiraiDevice.create(
                        uuid.v4(),
                        {
                            deviceId: item.deviceId,
                            messageId: message.messageId,
                            deviceType: message.deviceType,
                            dataType: message.dataType,
                            messageType: message.messageType,
                            value: message.value,
                            unit: message.unit,
                            errorFlg: message.errorFlg,
                            dataReceiveDate: message.dataReceiveDate,
                            eventDate: message.eventDate,
                            createdon: message.createdon,
                        },
                        now,
                    ),
                ),
            );

            await this.builMiraiDeviceRepository.saveBulk(savedBuilMiraiDevicesData);
            return true;
        } catch (error) {
            throw error;
        }
    };
}
