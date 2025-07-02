export class ActCast {
    actCastId: string;
    deviceId: string;
    timestamp: string;
    lineId: number;
    forward: number;
    backward: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(input: Pick<ActCast, 'actCastId' | 'createdAt' | 'updatedAt'> & ActCastUpdatableField) {
        Object.assign(this, input);
        this.actCastId = input.actCastId;
        this.deviceId = input.deviceId;
        this.timestamp = input.timestamp;
        this.lineId = input.lineId;
        this.forward = input.forward;
        this.backward = input.backward;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }

    public static create = (actCastId: string, item: ActCastUpdatableField, now: Date): ActCast =>
        new ActCast({
            actCastId,
            ...item,
            createdAt: now,
            updatedAt: now,
        });

    public update = (input: ActCastUpdatableField, now: Date): ActCast => {
        this.deviceId = input.deviceId;
        this.timestamp = input.timestamp;
        this.lineId = input.lineId;
        this.forward = input.forward;
        this.backward = input.backward;
        this.updatedAt = now;
        return this;
    };
}

export type ActCastUpdatableField = Pick<ActCast, 'deviceId' | 'timestamp' | 'lineId' | 'forward' | 'backward'>;
