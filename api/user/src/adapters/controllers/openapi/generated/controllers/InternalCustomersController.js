/**
 * The InternalCustomersController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/InternalCustomersService');
const createInternalCustomer = async (request, response) => {
    await Controller.handleRequest(request, response, service.createInternalCustomer);
};

const getInternalCustomer = async (request, response) => {
    await Controller.handleRequest(request, response, service.getInternalCustomer);
};

const getInternalCustomerById = async (request, response) => {
    await Controller.handleRequest(request, response, service.getInternalCustomerById);
};

const getInternalCustomerByIds = async (request, response) => {
    await Controller.handleRequest(request, response, service.getInternalCustomerByIds);
};

const internalCheckUserPermission = async (request, response) => {
    await Controller.handleRequest(request, response, service.internalCheckUserPermission);
};

const internalGetAllowedEventIds = async (request, response) => {
    await Controller.handleRequest(request, response, service.internalGetAllowedEventIds);
};

const softDeleteInternalCustomerById = async (request, response) => {
    await Controller.handleRequest(request, response, service.softDeleteInternalCustomerById);
};

const updateInternalCustomerById = async (request, response) => {
    await Controller.handleRequest(request, response, service.updateInternalCustomerById);
};

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
