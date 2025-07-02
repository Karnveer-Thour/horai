export interface IEmailProviderConnectionHolder<T> {
    initialize(input?: { provider: any; senderGmailAddress: string; svBCCAddress: string }): void;
    getSenderGmailAddress(): string;
    getInstance(): T;
    getSvBCCAddress(): string;
    close(): Promise<void>;
}
