export class EmiPeopleCounterHeadCross {
    emiPeopleCounterHeadCrossId: string;
    uuid: string;
    timestamp: string;
    timestampFrom: string;
    lineId: string;
    intoInside: number;
    count: number;
    elapsedSeconds: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        input: Pick<EmiPeopleCounterHeadCross, 'emiPeopleCounterHeadCrossId' | 'createdAt' | 'updatedAt'> &
            EmiPeopleCounterHeadCrossUpdatableField,
    ) {
        Object.assign(this, input);
        this.emiPeopleCounterHeadCrossId = input.emiPeopleCounterHeadCrossId;
        this.uuid = input.uuid;
        this.timestamp = input.timestamp;
        this.timestampFrom = input.timestampFrom;
        this.lineId = input.lineId;
        this.intoInside = input.intoInside;
        this.count = input.count;
        this.elapsedSeconds = input.elapsedSeconds;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }

    public static create = (
        emiPeopleCounterHeadCrossId: string,
        item: EmiPeopleCounterHeadCrossUpdatableField,
        now: Date,
    ): EmiPeopleCounterHeadCross =>
        new EmiPeopleCounterHeadCross({
            emiPeopleCounterHeadCrossId,
            ...item,
            createdAt: now,
            updatedAt: now,
        });

    public update = (input: EmiPeopleCounterHeadCrossUpdatableField, now: Date): EmiPeopleCounterHeadCross => {
        this.uuid = input.uuid;
        this.timestamp = input.timestamp;
        this.timestampFrom = input.timestampFrom;
        this.lineId = input.lineId;
        this.intoInside = input.intoInside;
        this.count = input.count;
        this.elapsedSeconds = input.elapsedSeconds;
        this.updatedAt = now;
        return this;
    };
}

export type EmiPeopleCounterHeadCrossUpdatableField = Pick<
    EmiPeopleCounterHeadCross,
    'uuid' | 'timestamp' | 'timestampFrom' | 'lineId' | 'intoInside' | 'count' | 'elapsedSeconds'
>;
