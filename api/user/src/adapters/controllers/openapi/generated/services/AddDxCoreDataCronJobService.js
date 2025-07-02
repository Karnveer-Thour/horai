/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Cron Job to save dxcore user data
 *
 * no response value expected for this operation
 * */
const addDxCoreData = () =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(Service.successResponse({}));
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });

module.exports = {
    addDxCoreData,
};
