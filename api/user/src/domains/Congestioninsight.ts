export class Congestioninsight {
    congestioninsightId: string;
    uuid: string;
    timestamp: string;
    count: number;
    device_id: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        input: Pick<Congestioninsight, 'congestioninsightId' | 'createdAt' | 'updatedAt'> &
            CongestioninsightUpdatableField,
    ) {
        Object.assign(this, input);
        this.congestioninsightId = input.congestioninsightId;
        this.uuid = input.uuid;
        this.timestamp = input.timestamp;
        this.count = input.count;
        this.device_id = input.device_id;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }

    public static create = (
        congestioninsightId: string,
        item: CongestioninsightUpdatableField,
        now: Date,
    ): Congestioninsight =>
        new Congestioninsight({
            congestioninsightId,
            ...item,
            createdAt: now,
            updatedAt: now,
        });

    public update = (input: CongestioninsightUpdatableField, now: Date): Congestioninsight => {
        this.uuid = input.uuid;
        this.timestamp = input.timestamp;
        this.count = input.count;
        this.device_id = input.device_id;
        this.updatedAt = now;
        return this;
    };
}

export type CongestioninsightUpdatableField = Pick<Congestioninsight, 'uuid' | 'timestamp' | 'count' | 'device_id'>;
