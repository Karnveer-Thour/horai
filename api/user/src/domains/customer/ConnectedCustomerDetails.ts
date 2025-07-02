export class ConnectedCustomerDetails {
    connectedCustomerDetailsId: string;
    customerId: string;
    appType: string;
    connectedCustomerPayload: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        input: Pick<
            ConnectedCustomerDetails,
            | 'connectedCustomerDetailsId'
            | 'customerId'
            | 'appType'
            | 'connectedCustomerPayload'
            | 'createdAt'
            | 'updatedAt'
            | 'isActive'
        >,
    ) {
        Object.assign(this, input);
        this.connectedCustomerDetailsId = input.connectedCustomerDetailsId;
        this.customerId = input.customerId;
        this.appType = input.appType;
        this.connectedCustomerPayload = input.connectedCustomerPayload;
        this.isActive = input.isActive;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }

    public static create = (
        connectedCustomerDetailsId: string,
        customerId: string,
        appType: string,
        connectedCustomerPayload: string,
        now: Date,
    ): ConnectedCustomerDetails =>
        new ConnectedCustomerDetails({
            connectedCustomerDetailsId,
            customerId,
            appType,
            connectedCustomerPayload,
            createdAt: now,
            updatedAt: now,
            isActive: true,
        });

    public update = (
        input: Pick<ConnectedCustomerDetails, 'appType' | 'connectedCustomerPayload' | 'isActive'>,
        now: Date,
    ): ConnectedCustomerDetails => {
        this.appType = input.appType;
        this.connectedCustomerPayload = input.connectedCustomerPayload;
        this.isActive = input.isActive;
        this.updatedAt = now;
        return this;
    };
}

export type ConnectedCustomerDetailsUpdatableField = Pick<
    ConnectedCustomerDetails,
    'appType' | 'connectedCustomerPayload' | 'isActive'
>;
