import { LoggedInUser } from './LoggedInUser';

describe('LoggedInUser', () => {
    test('SV User', () => {
        const loggedInUser = new LoggedInUser({
            id: 'testid',
            email: 'test@example.com',
            role: 'sv',
        });
        expect(loggedInUser.isSv()).toEqual(true);
        expect(loggedInUser.isAmo()).toEqual(false);
        expect(loggedInUser.isSmb()).toEqual(false);
        expect(loggedInUser.canEditAmo('someamo')).toEqual(true);
        expect(loggedInUser.canEditSmb('someamo', 'somesmb')).toEqual(true);
    });
    test('AMO User', () => {
        const loggedInUser = new LoggedInUser({
            id: 'testid',
            email: 'test@example.com',
            role: 'amo',
            amoId: 'ownamo',
        });
        expect(loggedInUser.isSv()).toEqual(false);
        expect(loggedInUser.isAmo()).toEqual(true);
        expect(loggedInUser.isSmb()).toEqual(false);
        expect(loggedInUser.canEditAmo('ownamo')).toEqual(true);
        expect(loggedInUser.canEditAmo('otheramo')).toEqual(false);
        expect(loggedInUser.canEditSmb('ownamo', 'somesmb')).toEqual(true);
        expect(loggedInUser.canEditSmb('otheramo', 'somesmb')).toEqual(false);
    });
    test('SMB User', () => {
        const loggedInUser = new LoggedInUser({
            id: 'testid',
            email: 'test@example.com',
            role: 'smb',
            amoId: 'ownamo',
            smbId: 'ownsmb',
        });
        expect(loggedInUser.isSv()).toEqual(false);
        expect(loggedInUser.isAmo()).toEqual(false);
        expect(loggedInUser.isSmb()).toEqual(true);
        expect(loggedInUser.canEditAmo('ownamo')).toEqual(false);
        expect(loggedInUser.canEditAmo('otheramo')).toEqual(false);
        expect(loggedInUser.canEditSmb('ownamo', 'ownsmb')).toEqual(true);
        expect(loggedInUser.canEditSmb('otheramo', 'ownsmb')).toEqual(false);
        expect(loggedInUser.canEditSmb('otheramo', 'othersmb')).toEqual(false);
    });
    test('Consumer User', () => {
        const loggedInUser = new LoggedInUser({
            id: 'testid',
            email: 'test@example.com',
        });
        expect(loggedInUser.isSv()).toEqual(false);
        expect(loggedInUser.isAmo()).toEqual(false);
        expect(loggedInUser.isSmb()).toEqual(false);
        expect(loggedInUser.canEditAmo('someamo')).toEqual(false);
        expect(loggedInUser.canEditSmb('someamo', 'somesmb')).toEqual(false);
    });
});
