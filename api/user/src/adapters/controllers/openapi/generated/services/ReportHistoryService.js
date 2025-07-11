/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 *
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * page BigDecimal  (optional)
 * limit BigDecimal  (optional)
 * searchText String  (optional)
 * reportType String  (optional)
 * returns List
 * */
const getAllReportHistory = ({ authorization, page, limit, searchText, reportType }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    authorization,
                    page,
                    limit,
                    searchText,
                    reportType,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 *
 * reportHistoryId String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * returns TodoReportHistory
 * */
const getReportHistoryById = ({ reportHistoryId, authorization }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    reportHistoryId,
                    authorization,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 *
 * reportId String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * returns List
 * */
const getReportHistoryByReportId = ({ reportId, authorization }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    reportId,
                    authorization,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 *
 * smbId String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * returns List
 * */
const getReportHistoryBySmbId = ({ smbId, authorization }) =>
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

module.exports = {
    getAllReportHistory,
    getReportHistoryById,
    getReportHistoryByReportId,
    getReportHistoryBySmbId,
};
