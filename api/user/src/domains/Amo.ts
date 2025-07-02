export class Amo {
    amoId: string;
    name: string;
    email: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(input: Pick<Amo, 'amoId' | 'createdAt' | 'updatedAt'> & AmoUpdatableField) {
        Object.assign(this, input);
        this.amoId = input.amoId;
        this.name = input.name;
        this.email = input.email;
        this.isActive = input.isActive;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
    }

    public static create = (amoId: string, item: AmoUpdatableField, now: Date): Amo =>
        new Amo({
            amoId,
            ...item,
            createdAt: now,
            updatedAt: now,
        });
    public update = (input: AmoUpdatableField, now: Date): Amo => {
        this.name = input.name;
        this.email = input.email;
        this.updatedAt = now;
        return this;
    };
    public updateStatus = (isActive: boolean, now: Date): Amo => {
        this.isActive = isActive;
        this.updatedAt = now;
        return this;
    };
}

export type AmoUpdatableField = Pick<Amo, 'name' | 'email' | 'isActive'>;
