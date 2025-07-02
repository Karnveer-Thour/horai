export class EmiPeopleCounterHead {
    emiPeopleCounterHeadId: string;
    cameraId: string;
    timestamp: string;
    peopleCount: number;
    areaName: string;
    sendTrigger: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        input: Pick<EmiPeopleCounterHead, 'emiPeopleCounterHeadId' | 'createdAt' | 'updatedAt'> &
            EmiPeopleCounterHeadUpdatableField,
    ) {
        Object.assign(this, input);
        this.emiPeopleCounterHeadId = input.emiPeopleCounterHeadId;
        this.cameraId = input.cameraId;
        this.timestamp = input.timestamp;
        this.peopleCount = input.peopleCount;
        this.areaName = input.areaName;
        this.sendTrigger = input.sendTrigger;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }

    public static create = (
        emiPeopleCounterHeadId: string,
        item: EmiPeopleCounterHeadUpdatableField,
        now: Date,
    ): EmiPeopleCounterHead =>
        new EmiPeopleCounterHead({
            emiPeopleCounterHeadId,
            ...item,
            createdAt: now,
            updatedAt: now,
        });

    public update = (input: EmiPeopleCounterHeadUpdatableField, now: Date): EmiPeopleCounterHead => {
        this.cameraId = input.cameraId;
        this.timestamp = input.timestamp;
        this.peopleCount = input.peopleCount;
        this.areaName = input.areaName;
        this.sendTrigger = input.sendTrigger;
        this.updatedAt = now;
        return this;
    };
}

export type EmiPeopleCounterHeadUpdatableField = Pick<
    EmiPeopleCounterHead,
    'cameraId' | 'timestamp' | 'peopleCount' | 'areaName' | 'sendTrigger'
>;
