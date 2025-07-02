/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Create customer
 *
 * xsecretrequestkey String Only for internal header. (optional)
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * customerBody CustomerBody  (optional)
 * no response value expected for this operation
 * */
const createInternalCustomer = ({ xsecretrequestkey, authorization, customerBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    xsecretrequestkey,
                    authorization,
                    customerBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Get all customers
 *
 * xsecretrequestkey String Only for internal header. (optional)
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * internalGetCustomersBody InternalGetCustomersBody  (optional)
 * returns List
 * */
const getInternalCustomer = ({ xsecretrequestkey, authorization, internalGetCustomersBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    xsecretrequestkey,
                    authorization,
                    internalGetCustomersBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Get customer By id
 *
 * customerId String Please use customerId or email
 * xsecretrequestkey String Only for internal header. (optional)
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * serviceType String  (optional)
 * returns Customer
 * */
const getInternalCustomerById = ({ customerId, xsecretrequestkey, authorization, serviceType }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    customerId,
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
 * Get all customers
 *
 * xsecretrequestkey String Only for internal header. (optional)
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * internalGetCustomersBody InternalGetCustomersBody  (optional)
 * returns List
 * */
const getInternalCustomerByIds = ({ xsecretrequestkey, authorization, internalGetCustomersBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    xsecretrequestkey,
                    authorization,
                    internalGetCustomersBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Front-end don't use this api. Check user permission
 *
 * xsecretrequestkey String Only for internal header. (optional)
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * checkUserPermissionBody CheckUserPermissionBody  (optional)
 * no response value expected for this operation
 * */
const internalCheckUserPermission = ({ xsecretrequestkey, authorization, checkUserPermissionBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    xsecretrequestkey,
                    authorization,
                    checkUserPermissionBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Front-end don't use this api. Check user permission
 *
 * userEmail String
 * xsecretrequestkey String Only for internal header. (optional)
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * no response value expected for this operation
 * */
const internalGetAllowedEventIds = ({ userEmail, xsecretrequestkey, authorization }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    userEmail,
                    xsecretrequestkey,
                    authorization,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * Delete customer By id
 *
 * customerId String
 * xsecretrequestkey String Only for internal header. (optional)
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * serviceType String  (optional)
 * no response value expected for this operation
 * */
const softDeleteInternalCustomerById = ({ customerId, xsecretrequestkey, authorization, serviceType }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    customerId,
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
 * Update customer
 *
 * customerId String
 * xsecretrequestkey String Only for internal header. (optional)
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * customerBody CustomerBody  (optional)
 * no response value expected for this operation
 * */
const updateInternalCustomerById = ({ customerId, xsecretrequestkey, authorization, customerBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    customerId,
                    xsecretrequestkey,
                    authorization,
                    customerBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });

module.exports = {
    createInternalCustomer,
    getInternalCustomer,
    getInternalCustomerById,
    getInternalCustomerByIds,
    internalCheckUserPermission,
    internalGetAllowedEventIds,
    softDeleteInternalCustomerById,
    updateInternalCustomerById,
};
