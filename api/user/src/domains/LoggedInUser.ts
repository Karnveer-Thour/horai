export class LoggedInUser {
    id: string;
    email: string;
    role?: string;
    amoId?: string;
    smbId?: string;

    constructor(init: Partial<LoggedInUser> & Pick<LoggedInUser, 'id' | 'email' | 'role' | 'amoId' | 'smbId'>) {
        Object.assign(this, init);
        this.id = init.id;
        this.email = init.email;
        this.role = init.role;
        this.amoId = init.amoId;
        this.smbId = init.smbId;
    }

    isSv = () => this.role === 'sv' || this.email === 'systemuser@schemeverge.com'; // TODO
    isAmo = () => this.role === 'amo' && !!this.amoId;
    isSmb = () => this.role === 'smb' && !!this.amoId && !!this.smbId;
    canEditAmo = (amoId: string): boolean => {
        if (this.isSv()) return true;
        else if (this.isAmo() && amoId === this.amoId) return true;
        return false;
    };
    canEditSmb = (amoId: string, smbId: string): boolean => {
        if (this.canEditAmo(amoId)) return true;
        else if (this.isSmb() && amoId === this.amoId && smbId === this.smbId) return true;
        return false;
    };
}
