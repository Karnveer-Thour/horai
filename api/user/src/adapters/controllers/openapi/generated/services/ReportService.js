/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Create todo report
 *
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * todoReportBody TodoReportBody  (optional)
 * returns TodoReport
 * */
const createReport = ({ authorization, todoReportBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    authorization,
                    todoReportBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 *
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * page BigDecimal  (optional)
 * limit BigDecimal  (optional)
 * searchText String  (optional)
 * reportType String  (optional)
 * returns TodoReport
 * */
const getAll = ({ authorization, page, limit, searchText, reportType }) =>
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
 * reportId String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * returns TodoReport
 * */
const getReportById = ({ reportId, authorization }) =>
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
 * deletes Todo report by reportId
 *
 * reportId String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * no response value expected for this operation
 * */
const softDeleteReportById = ({ reportId, authorization }) =>
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
 * Update Todo Report
 *
 * reportId String
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * todoReportUpdateBody TodoReportUpdateBody  (optional)
 * no response value expected for this operation
 * */
const updateReportById = ({ reportId, authorization, todoReportUpdateBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    reportId,
                    authorization,
                    todoReportUpdateBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });

module.exports = {
    createReport,
    getAll,
    getReportById,
    softDeleteReportById,
    updateReportById,
};
