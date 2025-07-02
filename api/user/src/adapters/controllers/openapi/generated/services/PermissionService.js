/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Create Permisson
 *
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * inlineObject InlineObject  (optional)
 * no response value expected for this operation
 * */
const createPermission = ({ authorization, inlineObject }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    authorization,
                    inlineObject,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Delete permission
 *
 * subject String
 * resource String
 * action String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * no response value expected for this operation
 * */
const deletePermission = ({ subject, resource, action, authorization }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    subject,
                    resource,
                    action,
                    authorization,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Update permission
 *
 * subject String
 * resource String
 * action String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * inlineObject1 InlineObject1  (optional)
 * no response value expected for this operation
 * */
const updatePermission = ({ subject, resource, action, authorization, inlineObject1 }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    subject,
                    resource,
                    action,
                    authorization,
                    inlineObject1,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });

module.exports = {
    createPermission,
    deletePermission,
    updatePermission,
};
