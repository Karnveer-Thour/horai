export class BuilMiraiDevice {
    builMiraiDeviceId: string;
    deviceId: string;
    messageId: string;
    deviceType: string;
    dataType: string;
    messageType: string;
    value: string;
    unit: string;
    errorFlg: boolean;
    eventDate: Date;
    dataReceiveDate: Date;
    createdon: Date;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        input: Pick<BuilMiraiDevice, 'builMiraiDeviceId' | 'createdAt' | 'updatedAt'> & BuilMiraiDeviceUpdatableField,
    ) {
        Object.assign(this, input);
        this.builMiraiDeviceId = input.builMiraiDeviceId;
        this.deviceId = input.deviceId;
        this.messageId = input.messageId;
        this.deviceType = input.deviceType;
        this.dataType = input.dataType;
        this.messageType = input.messageType;
        this.value = input.value;
        this.unit = input.unit;
        this.errorFlg = input.errorFlg;
        this.eventDate = input.eventDate;
        this.dataReceiveDate = input.dataReceiveDate;
        this.createdon = input.createdon;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }

    public static create = (
        builMiraiDeviceId: string,
        item: BuilMiraiDeviceUpdatableField,
        now: Date,
    ): BuilMiraiDevice =>
        new BuilMiraiDevice({
            builMiraiDeviceId,
            ...item,
            createdAt: now,
            updatedAt: now,
        });

    public update = (input: BuilMiraiDeviceUpdatableField, now: Date): BuilMiraiDevice => {
        this.createdon = input.createdon;
        this.updatedAt = now;
        return this;
    };
}

export type BuilMiraiDeviceUpdatableField = Pick<
    BuilMiraiDevice,
    | 'deviceId'
    | 'messageId'
    | 'deviceType'
    | 'dataType'
    | 'messageType'
    | 'value'
    | 'unit'
    | 'errorFlg'
    | 'dataReceiveDate'
    | 'createdon'
    | 'eventDate'
>;
