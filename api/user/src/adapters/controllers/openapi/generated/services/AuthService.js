/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Generate OTP to be sent on email address provided
 *
 * generateOtpBody GenerateOtpBody  (optional)
 * returns Object
 * */
const generateOtp = ({ generateOtpBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    generateOtpBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Verify OTP and create guest user entry
 *
 * verifyOtpBody VerifyOtpBody  (optional)
 * returns inline_response_200
 * */
const verifyOtpAndCreateGuestCustomer = ({ verifyOtpBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    verifyOtpBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });

module.exports = {
    generateOtp,
    verifyOtpAndCreateGuestCustomer,
};
