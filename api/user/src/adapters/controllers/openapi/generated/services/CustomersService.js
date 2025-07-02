/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Create customer
 *
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * customerBody CustomerBody  (optional)
 * returns Customer
 * */
const createCustomer = ({ authorization, customerBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    authorization,
                    customerBody,
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
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * serviceType String  (optional)
 * no response value expected for this operation
 * */
const deleteCustomerById = ({ customerId, authorization, serviceType }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    customerId,
                    authorization,
                    serviceType,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });
/**
 * GET all customers
 *
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * page BigDecimal  (optional)
 * limit BigDecimal  (optional)
 * searchText String  (optional)
 * serviceType String  (optional)
 * returns CustomerList
 * */
const getAllCustomers = ({ authorization, page, limit, searchText, serviceType }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    authorization,
                    page,
                    limit,
                    searchText,
                    serviceType,
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
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * socialAccount String  (optional)
 * returns Customer
 * */
const getCustomerById = ({ customerId, authorization, socialAccount }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    customerId,
                    authorization,
                    socialAccount,
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
 * authorization String 使用不可.　この変数は設定してはいけない.　bearer認証用token.　ServerCode生成用. (optional)
 * customerBody CustomerBody  (optional)
 * no response value expected for this operation
 * */
const updateCustomerById = ({ customerId, authorization, customerBody }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    customerId,
                    authorization,
                    customerBody,
                }),
            );
        } catch (e) {
            reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
        }
    });

module.exports = {
    createCustomer,
    deleteCustomerById,
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
};
