import { UnauthorizedError } from './errors/UnauthorizedError';

const jwt = require('jsonwebtoken');

export const decryptConnectedCustomerToken = (token: any) => {
    try {
        console.log('token -- ', token);

        // Decode the JWT without verifying the signature
        const decoded = jwt.decode(token, { complete: true });
        if (!decoded) throw new UnauthorizedError('Invalid token');

        if (decoded) {
            return {
                success: true,
                data: { decodedPayload: decoded.payload },
            };
        } else {
            throw new UnauthorizedError('Invalid token');
        }
    } catch (error) {
        throw new UnauthorizedError('Invalid token');
    }
};
