/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Cron Job to save builmirai device data
 *
 * fromDate Date fromDate for filtering (date should be in utc format) (optional)
 * toDate Date toDate for filtering (date should be in utc format) (optional)
 * no response value expected for this operation
 * */
const addBuilMiraiDeviceData = ({ fromDate, toDate }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    fromDate,
                    toDate,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });

module.exports = {
    addBuilMiraiDeviceData,
};
