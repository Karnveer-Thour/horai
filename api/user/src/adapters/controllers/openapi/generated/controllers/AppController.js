/**
 * The AppController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/AppService');
const amosAmoIdPUT = async (request, response) => {
    await Controller.handleRequest(request, response, service.amosAmoIdPUT);
};

const createUser = async (request, response) => {
    await Controller.handleRequest(request, response, service.createUser);
};

const getAmoById = async (request, response) => {
    await Controller.handleRequest(request, response, service.getAmoById);
};

const getAmos = async (request, response) => {
    await Controller.handleRequest(request, response, service.getAmos);
};

const getMe = async (request, response) => {
    await Controller.handleRequest(request, response, service.getMe);
};

const getSmbById = async (request, response) => {
    await Controller.handleRequest(request, response, service.getSmbById);
};

const getSmbs = async (request, response) => {
    await Controller.handleRequest(request, response, service.getSmbs);
};

const getUser = async (request, response) => {
    await Controller.handleRequest(request, response, service.getUser);
};

const getUserRole = async (request, response) => {
    await Controller.handleRequest(request, response, service.getUserRole);
};

const getUserRoles = async (request, response) => {
    await Controller.handleRequest(request, response, service.getUserRoles);
};

const hcGET = async (request, response) => {
    await Controller.handleRequest(request, response, service.hcGET);
};

const listUsers = async (request, response) => {
    await Controller.handleRequest(request, response, service.listUsers);
};

const updateSmb = async (request, response) => {
    await Controller.handleRequest(request, response, service.updateSmb);
};

const updateUser = async (request, response) => {
    await Controller.handleRequest(request, response, service.updateUser);
};

const userDELETE = async (request, response) => {
    await Controller.handleRequest(request, response, service.userDELETE);
};

module.exports = {
    amosAmoIdPUT,
    createUser,
    getAmoById,
    getAmos,
    getMe,
    getSmbById,
    getSmbs,
    getUser,
    getUserRole,
    getUserRoles,
    hcGET,
    listUsers,
    updateSmb,
    updateUser,
    userDELETE,
};
