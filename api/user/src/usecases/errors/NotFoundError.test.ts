import { NotFoundError } from './NotFoundError';

describe('Must throw not found error', () => {
    it('not found error', () => {
        try {
            NotFoundError.model('user model', 'id field', '3');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
        }
    });
});
