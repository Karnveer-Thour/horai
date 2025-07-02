/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Front-end don't use this api. Get All Dx Core User device tokens for service internal
 *
 * xsecretrequestkey String Only for internal header. (optional)
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * serviceType String  (optional)
 * returns List
 * */
const internalGetAllDxCoreUserDeviceTokenService = ({ xsecretrequestkey, authorization, serviceType }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    xsecretrequestkey,
                    authorization,
                    serviceType,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Front-end don't use this api. Get SMB by id
 *
 * smbId String Id of specific Smb
 * xsecretrequestkey String Only for internal header. (optional)
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * returns Smb
 * */
const internalGetSmbById = ({ smbId, xsecretrequestkey, authorization }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    smbId,
                    xsecretrequestkey,
                    authorization,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Front-end don't use this api. Get SMBs
 *
 * xsecretrequestkey String Only for internal header. (optional)
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * amoId String  (optional)
 * returns List
 * */
const internalGetSmbs = ({ xsecretrequestkey, authorization, amoId }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    xsecretrequestkey,
                    authorization,
                    amoId,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Front-end don't use this api. Get user device tokens for service internal
 *
 * email String
 * xsecretrequestkey String Only for internal header. (optional)
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * serviceType String  (optional)
 * returns UserDeviceTokenResponseBody
 * */
const internalGetUserDeviceTokenService = ({ email, xsecretrequestkey, authorization, serviceType }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    email,
                    xsecretrequestkey,
                    authorization,
                    serviceType,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Front-end don't use this api. Get user for service internal
 *
 * email String
 * xsecretrequestkey String Only for internal header. (optional)
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * returns UserBody
 * */
const internalGetUserService = ({ email, xsecretrequestkey, authorization }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    email,
                    xsecretrequestkey,
                    authorization,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });

module.exports = {
    internalGetAllDxCoreUserDeviceTokenService,
    internalGetSmbById,
    internalGetSmbs,
    internalGetUserDeviceTokenService,
    internalGetUserService,
};
