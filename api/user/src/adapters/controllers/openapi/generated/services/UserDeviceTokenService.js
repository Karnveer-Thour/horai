/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Delete User Device Token
 *
 * deviceToken String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * no response value expected for this operation
 * */
const deleteUserDeviceToken = ({ deviceToken, authorization }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    deviceToken,
                    authorization,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Update User Device Token
 *
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * deviceTokenBody DeviceTokenBody  (optional)
 * no response value expected for this operation
 * */
const updateUserDeviceToken = ({ authorization, deviceTokenBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    authorization,
                    deviceTokenBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });

module.exports = {
    deleteUserDeviceToken,
    updateUserDeviceToken,
};
