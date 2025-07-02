/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Get The Tech Hub Yokohama Details
 *
 * returns Smb
 * */
const getTechHubYokohama = () =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(Service.successResponse({}));
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Get The Seat Halki detail
 *
 * returns Smb
 * */
const getTheSeatHalkiSmb = () =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(Service.successResponse({}));
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });

module.exports = {
    getTechHubYokohama,
    getTheSeatHalkiSmb,
};
