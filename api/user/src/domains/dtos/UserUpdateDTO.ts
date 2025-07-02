export type UserUpdateDTO = {
    userId?: string;
    email?: string;
    role?: 'sv' | 'amo' | 'smb';
    amoId?: string;
    smbId?: string;
};
