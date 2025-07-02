/**
 * The InternalController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/InternalService');
const internalGetAllDxCoreUserDeviceTokenService = async (request, response) => {
    await Controller.handleRequest(request, response, service.internalGetAllDxCoreUserDeviceTokenService);
};

const internalGetSmbById = async (request, response) => {
    await Controller.handleRequest(request, response, service.internalGetSmbById);
};

const internalGetSmbs = async (request, response) => {
    await Controller.handleRequest(request, response, service.internalGetSmbs);
};

const internalGetUserDeviceTokenService = async (request, response) => {
    await Controller.handleRequest(request, response, service.internalGetUserDeviceTokenService);
};

const internalGetUserService = async (request, response) => {
    await Controller.handleRequest(request, response, service.internalGetUserService);
};

module.exports = {
    internalGetAllDxCoreUserDeviceTokenService,
    internalGetSmbById,
    internalGetSmbs,
    internalGetUserDeviceTokenService,
    internalGetUserService,
};
