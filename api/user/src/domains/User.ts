import { Amo } from './Amo';
import { Smb } from './Smb';
import { UserStatus } from '.prisma/client';

export class User {
    email: string;
    userId?: string;
    role?: 'sv' | 'amo' | 'smb';
    amoId?: string;
    smbId?: string;
    createdAt: Date;
    updatedAt: Date;
    private amo?: Amo;
    private smb?: Smb;
    status: UserStatus;

    constructor(input: Pick<User, 'email' | 'createdAt' | 'updatedAt'> & UserUpdatableField) {
        Object.assign(this, input);
        this.email = input.email;
        this.userId = input.userId;
        this.role = input.role;
        this.amoId = input.amoId;
        this.smbId = input.smbId;
        this.createdAt = input.createdAt;
        this.updatedAt = input.updatedAt;
        this.status = input.status || UserStatus.ACTIVE;
    }

    public static create = (email: string, item: UserUpdatableField, now: Date): User =>
        new User({
            email,
            ...item,
            createdAt: now,
            updatedAt: now,
            status: item.status || UserStatus.ACTIVE,
        });

    public update = (input: UserUpdatableField, now: Date): User => {
        this.userId = input.userId;
        this.role = input.role;
        this.amoId = input.amoId;
        this.smbId = input.smbId;
        this.updatedAt = now;
        if (input.status) this.status = input.status;
        return this;
    };

    public setAmo(amo: Amo) {
        if (this.amoId && amo.amoId === this.amoId) this.amo = amo;
        else throw new Error(`Cannot assign amo to user for amoId: ${amo.amoId}`);
    }

    public setSmb(smb: Smb) {
        if (this.smbId && smb.smbId === this.smbId) this.smb = smb;
        else throw new Error(`Cannot assign smb to user for smbId: ${smb.smbId}`);
    }

    public getSmb(): Smb | undefined {
        return this.smb;
    }

    public getAmo(): Amo | undefined {
        return this.amo;
    }
}

export type UserUpdatableField = Pick<User, 'userId' | 'role' | 'amoId' | 'smbId'> & { status?: UserStatus };
