/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Enable communication between different types of app accounts for efficient collaboration and resource sharing.
 *
 * horaiUnderscoreauthorizationUnderscoretoken String horai user authorization token
 * appAccountUnderscoreauthorizationUnderscoretoken String appAccount user authorization token
 * appType String The type of the app account to be linked (e.g., nBiz, dxcore)
 * no response value expected for this operation
 * */
const accountLinking = ({
    horaiUnderscoreauthorizationUnderscoretoken,
    appAccountUnderscoreauthorizationUnderscoretoken,
    appType,
}) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    horaiUnderscoreauthorizationUnderscoretoken,
                    appAccountUnderscoreauthorizationUnderscoretoken,
                    appType,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Unlink connection between HORAI and other users for efficient collaboration and resource sharing.
 *
 * appType String The application type to unlink (e.g., nBiz, dxcore)
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * no response value expected for this operation
 * */
const unlinkCustomerConnection = ({ appType, authorization }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    appType,
                    authorization,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });

module.exports = {
    accountLinking,
    unlinkCustomerConnection,
};
