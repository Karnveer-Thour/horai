export interface IAuthorizationConnectionHolder<T> {
    initialize(): Promise<void>;

    getInstance(): T;

    addCustomFunctions(): void;

    close(): Promise<void>;
}
