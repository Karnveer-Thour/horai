/**
 * The ReportController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/ReportService');
const createReport = async (request, response) => {
    await Controller.handleRequest(request, response, service.createReport);
};

const getAll = async (request, response) => {
    await Controller.handleRequest(request, response, service.getAll);
};

const getReportById = async (request, response) => {
    await Controller.handleRequest(request, response, service.getReportById);
};

const softDeleteReportById = async (request, response) => {
    await Controller.handleRequest(request, response, service.softDeleteReportById);
};

const updateReportById = async (request, response) => {
    await Controller.handleRequest(request, response, service.updateReportById);
};

module.exports = {
    createReport,
    getAll,
    getReportById,
    softDeleteReportById,
    updateReportById,
};
