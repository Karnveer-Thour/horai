/**
 * The UserController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/UserService');
const createAmo = async (request, response) => {
    await Controller.handleRequest(request, response, service.createAmo);
};

const createSmb = async (request, response) => {
    await Controller.handleRequest(request, response, service.createSmb);
};

const createUser = async (request, response) => {
    await Controller.handleRequest(request, response, service.createUser);
};

const deactivateSmb = async (request, response) => {
    await Controller.handleRequest(request, response, service.deactivateSmb);
};

const deleteAmoByamoId = async (request, response) => {
    await Controller.handleRequest(request, response, service.deleteAmoByamoId);
};

const getAllAmos = async (request, response) => {
    await Controller.handleRequest(request, response, service.getAllAmos);
};

const getAllSmbs = async (request, response) => {
    await Controller.handleRequest(request, response, service.getAllSmbs);
};

const getAmoByamoId = async (request, response) => {
    await Controller.handleRequest(request, response, service.getAmoByamoId);
};

const getReportsBySmbId = async (request, response) => {
    await Controller.handleRequest(request, response, service.getReportsBySmbId);
};

const getSmbBySmbId = async (request, response) => {
    await Controller.handleRequest(request, response, service.getSmbBySmbId);
};

const updateAmoStatus = async (request, response) => {
    await Controller.handleRequest(request, response, service.updateAmoStatus);
};

const updateAmobyamoId = async (request, response) => {
    await Controller.handleRequest(request, response, service.updateAmobyamoId);
};

const updateReport = async (request, response) => {
    await Controller.handleRequest(request, response, service.updateReport);
};

const updateSmbBySmbId = async (request, response) => {
    await Controller.handleRequest(request, response, service.updateSmbBySmbId);
};

const updateUser = async (request, response) => {
    await Controller.handleRequest(request, response, service.updateUser);
};

const userDELETE = async (request, response) => {
    await Controller.handleRequest(request, response, service.userDELETE);
};

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
