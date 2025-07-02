/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Enable communication between HORAI, &BIZ users for efficient collaboration and resource sharing.
 *
 * horaiUnderscoreauthorizationUnderscoretoken String horai user authorization token
 * bizUnderscoreauthorizationUnderscoretoken String biz user authorization token
 * no response value expected for this operation
 * */
const bizUserCommunication = ({
    horaiUnderscoreauthorizationUnderscoretoken,
    bizUnderscoreauthorizationUnderscoretoken,
}) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    horaiUnderscoreauthorizationUnderscoretoken,
                    bizUnderscoreauthorizationUnderscoretoken,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * unlink connection between HORAI, &BIZ users for efficient collaboration and resource sharing.
 *
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * no response value expected for this operation
 * */
const unlinkBizUserConnection = ({ authorization }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    authorization,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });

module.exports = {
    bizUserCommunication,
    unlinkBizUserConnection,
};
