/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 *
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * amoBody AmoBody  (optional)
 * no response value expected for this operation
 * */
const createAmo = ({ authorization, amoBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    authorization,
                    amoBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Create SMB
 *
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * smbBody SmbBody  (optional)
 * no response value expected for this operation
 * */
const createSmb = ({ authorization, smbBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    authorization,
                    smbBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 *
 * email String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * userBody UserBody  (optional)
 * no response value expected for this operation
 * */
const createUser = ({ email, authorization, userBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    email,
                    authorization,
                    userBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 *
 * smbId String Id of specific Smb
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * smbStatusBody SmbStatusBody  (optional)
 * no response value expected for this operation
 * */
const deactivateSmb = ({ smbId, authorization, smbStatusBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    smbId,
                    authorization,
                    smbStatusBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * deletes amo by amoId
 *
 * amoId String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * no response value expected for this operation
 * */
const deleteAmoByamoId = ({ amoId, authorization }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    amoId,
                    authorization,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Get All AMOs
 *
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * returns List
 * */
const getAllAmos = ({ authorization }) =>
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
/**
 * Get All SMBs
 *
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * returns List
 * */
const getAllSmbs = ({ authorization }) =>
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
/**
 *
 * amoId String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * returns AmoBody
 * */
const getAmoByamoId = ({ amoId, authorization }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    amoId,
                    authorization,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Get v2 SMB reports by id
 *
 * smbId String Id of specific Smb
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * returns List
 * */
const getReportsBySmbId = ({ smbId, authorization }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    smbId,
                    authorization,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Get v2 SMB by id
 *
 * smbId String Id of specific Smb
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * returns Smb
 * */
const getSmbBySmbId = ({ smbId, authorization }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    smbId,
                    authorization,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 *
 * amoId String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * amoStatusBody AmoStatusBody  (optional)
 * no response value expected for this operation
 * */
const updateAmoStatus = ({ amoId, authorization, amoStatusBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    amoId,
                    authorization,
                    amoStatusBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 *
 * amoId String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * amoBody AmoBody  (optional)
 * no response value expected for this operation
 * */
const updateAmobyamoId = ({ amoId, authorization, amoBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    amoId,
                    authorization,
                    amoBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Update Report
 *
 * smbId String Id of specific Smb
 * reportId String Id of specific Report
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * reportUpdateBody ReportUpdateBody  (optional)
 * no response value expected for this operation
 * */
const updateReport = ({ smbId, reportId, authorization, reportUpdateBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    smbId,
                    reportId,
                    authorization,
                    reportUpdateBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Update Smb
 *
 * smbId String Id of specific Smb
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * smbUpdateBody SmbUpdateBody  (optional)
 * no response value expected for this operation
 * */
const updateSmbBySmbId = ({ smbId, authorization, smbUpdateBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    smbId,
                    authorization,
                    smbUpdateBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 *
 * email String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * userBody UserBody  (optional)
 * returns UserBody
 * */
const updateUser = ({ email, authorization, userBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    email,
                    authorization,
                    userBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * deletes user
 *
 * email String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * returns UserBody
 * */
const userDELETE = ({ email, authorization }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    email,
                    authorization,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });

module.exports = {
    createAmo,
    createSmb,
    createUser,
    deactivateSmb,
    deleteAmoByamoId,
    getAllAmos,
    getAllSmbs,
    getAmoByamoId,
    getReportsBySmbId,
    getSmbBySmbId,
    updateAmoStatus,
    updateAmobyamoId,
    updateReport,
    updateSmbBySmbId,
    updateUser,
    userDELETE,
};
