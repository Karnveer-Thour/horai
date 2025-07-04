import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { authorizationConnectionHolder, dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { getReportsBySmbId, updateReport } from './ReportHandler';
import { getSmbById, getTheSeatHalkiSmb, getTechHubYokohama, updateSmb } from './SmbHandler';
const { hcGET } = require('./HcHandler');
const { createAmo, getAmoByamoId, getAllAmos, updateAmobyAmoId, updateAmoStatus } = require('./AmoV2Handler');
const { getSmbsGET } = require('./SmbHandler');
const { createSmb, updateSmbBySmbId, deactivateSmb, getAllSmbs, getSmbBySmbId } = require('./SmbV2Handler');
const { internalGetSmbById, internalGetSmbs } = require('./InternalSmbHandler');
const {
    internalGetUserService,
    internalGetUserDeviceTokenService,
    internalGetAllDxCoreUserDeviceTokenService,
} = require('./InternalUserHandler');
const { listUsers, getUser, createUser, updateUser, userDELETE } = require('./UserHandler');
const { amosAmoIdPUT, getAmoById, amosGET } = require('./AmoHandler');

const { updateUserDeviceToken, deleteUserDeviceToken } = require('./UserDeviceTokenHandler');
const { generateOtp, verifyOtpAndCreateGuestCustomer } = require('./AuthHandler');
const { bizUserCommunication, unlinkBizUserConnection } = require('./BizUserHandler');
const { accountLinking, accountUnlink } = require('./AppAccountHandler');

const config = require('../generated/config.js');
const logger = require('../generated/logger.js');
const ExpressServer = require('../generated/expressServer.js');
const bearerToken = require('express-bearer-token');
const service = require('../generated/services/AppService');
const userService = require('../generated/services/UserService');
const coWorkingSpaceSmbService = require('../generated/services/CoWorkingSpaceSmbService');
const customerService = require('../generated/services/CustomersService');
const authService = require('../generated/services/AuthService');
const internalCustomersService = require('../generated/services/InternalCustomersService');
const userDeviceTokenService = require('../generated/services/UserDeviceTokenService');
const permissionService = require('../generated/services/PermissionService');
const internalService = require('../generated/services/InternalService');
const BizUserService = require('../generated/services/BizUserService');
const AppAccountService = require('../generated/services/AppAccountService');
const AddDxCoreDataCronJobService = require('../generated/services/AddDxCoreDataCronJobService');
const AddBuilMiraiDeviceDataCronJobService = require('../generated/services/AddBuilMiraiDeviceDataCronJobService');

import {
    createCustomer,
    deleteCustomerById,
    getAllCustomersWithPagination,
    getCustomerById,
    updateCustomerById,
} from './CustomerHandler';
import {
    createInternalCustomer,
    getInternalCustomer,
    getInternalCustomerById,
    softDeleteInternalCustomerById,
    updateInternalCustomerById,
} from './InternalCustomerHandler';
import { internalCheckUserPermission, internalGetAllowedEventIds } from './InternalPermissionHandler';
import { createPermission, deletePermission, updatePermission } from './PermissionHandler';
import { addBuilMiraiDeviceData, addDxCoreData } from './CronJobHandler';
import { createReport, getAllReports, getReportById, softDeleteReportById, updateReportById } from './PracticeCrud';
import { ReportService } from '../generated/services';

service.hcGET = hcGET;
service.getSmbs = getSmbsGET;

service.amosAmoIdPUT = amosAmoIdPUT;
service.getAmoById = getAmoById;
service.getAmos = amosGET;
service.getSmbById = getSmbById;
service.updateSmb = updateSmb;
coWorkingSpaceSmbService.getTheSeatHalkiSmb = getTheSeatHalkiSmb;
coWorkingSpaceSmbService.getTechHubYokohama = getTechHubYokohama;

//v2
userService.createSmb = createSmb;
userService.updateSmbBySmbId = updateSmbBySmbId;
userService.createAmo = createAmo;
userService.getAmoByamoId = getAmoByamoId;
userService.getAllAmos = getAllAmos;
userService.updateAmobyamoId = updateAmobyAmoId;
userService.updateAmoStatus = updateAmoStatus;
userService.deactivateSmb = deactivateSmb;
userService.getAllSmbs = getAllSmbs;
userService.getSmbBySmbId = getSmbBySmbId;
userService.getReportsBySmbId = getReportsBySmbId;
userService.updateReport = updateReport;

// users CRUD
service.listUsers = listUsers;
service.getUser = getUser;
service.updateUser = updateUser;
service.createUser = createUser;
service.userDELETE = userDELETE;

// Customer Service
customerService.createCustomer = createCustomer;
customerService.updateCustomerById = updateCustomerById;
customerService.getCustomerById = getCustomerById;
customerService.getAllCustomers = getAllCustomersWithPagination;
customerService.deleteCustomerById = deleteCustomerById;

// Auth Service
authService.generateOtp = generateOtp;
authService.verifyOtpAndCreateGuestCustomer = verifyOtpAndCreateGuestCustomer;

// for internal
internalService.internalGetSmbById = internalGetSmbById;
internalService.internalGetSmbs = internalGetSmbs;
internalService.internalGetUserService = internalGetUserService;
internalService.internalGetUserDeviceTokenService = internalGetUserDeviceTokenService;
internalService.internalGetAllDxCoreUserDeviceTokenService = internalGetAllDxCoreUserDeviceTokenService;

// User Device Token Service
userDeviceTokenService.updateUserDeviceToken = updateUserDeviceToken;
userDeviceTokenService.deleteUserDeviceToken = deleteUserDeviceToken;

// Permission
permissionService.createPermission = createPermission;
permissionService.updatePermission = updatePermission;
permissionService.deletePermission = deletePermission;

// Inter customer service
internalCustomersService.createInternalCustomer = createInternalCustomer;
internalCustomersService.getInternalCustomer = getInternalCustomer;
internalCustomersService.getInternalCustomerByIds = getInternalCustomer;
internalCustomersService.updateInternalCustomerById = updateInternalCustomerById;
internalCustomersService.getInternalCustomerById = getInternalCustomerById;
internalCustomersService.softDeleteInternalCustomerById = softDeleteInternalCustomerById;
internalCustomersService.internalCheckUserPermission = internalCheckUserPermission;
internalCustomersService.internalGetAllowedEventIds = internalGetAllowedEventIds;

//Biz User
BizUserService.bizUserCommunication = bizUserCommunication;
BizUserService.unlinkBizUserConnection = unlinkBizUserConnection;

// Integrated App Account
AppAccountService.accountLinking = accountLinking;
AppAccountService.unlinkCustomerConnection = accountUnlink;
AddDxCoreDataCronJobService.addDxCoreData = addDxCoreData;

//BuilMirai Device Data
AddBuilMiraiDeviceDataCronJobService.addBuilMiraiDeviceData = addBuilMiraiDeviceData;

//todo report
ReportService.createReport = createReport;
ReportService.getReportById = getReportById;
ReportService.getAll = getAllReports;
ReportService.updateReportById = updateReportById;
ReportService.softDeleteReportById = softDeleteReportById;

const gracefulShutdown = (server, closeFunctions) => async () => {
    await server.close().then(async () => {
        for (const closeFunc of closeFunctions) {
            await closeFunc();
        }
    });
};

const launchServer = async () => {
    try {
        const server = new ExpressServer(process.env.PORT || config.URL_PORT, config.OPENAPI_YAML);
        if (process.env.HORAI_MODE === 'production') {
            // to clear swagger in production
            const app = express();
            app.use(cors());
            app.use(bodyParser.json({ limit: '14MB' }));
            app.use(express.json());
            app.use(express.urlencoded({ extended: false }));
            app.use(cookieParser());
            server.app = app;
        }
        server.app.use((req, res, next) => {
            const token = req.headers['x-forwarded-authorization'] || req.headers['authorization'];
            req.headers.authorization = token;
            bearerToken()(req, res, next);
            req.headers.authorization = req.token;
        });
        server.app.use((req, res, next) => {
            try {
                console.log(`--> ${req.method} ${req.path}`);
                next();
            } catch (e) {
                console.log(e);
            } finally {
                console.log(`<-- ${req.method} ${req.path} ${res.statusCode}`);
            }
        });
        config.FILE_UPLOAD_PATH = process.env.FILE_UPLOAD_PATH || config.FILE_UPLOAD_PATH;
        await dbConnection.initialize();
        await authorizationConnectionHolder.initialize();
        await authorizationConnectionHolder.addCustomFunctions();

        server.launch();
        logger.info(`Express Server running`);
        process.on('SIGTERM', async function () {
            await gracefulShutdown(server, [dbConnection.close, authorizationConnectionHolder.close]);
            process.exit();
        });
        process.on('SIGINT', async function () {
            await gracefulShutdown(server, [dbConnection.close, authorizationConnectionHolder.close]);
            process.exit();
        });
    } catch (e) {
        logger.error(`Express Server failure`, e);
        gracefulShutdown(server, [dbConnection.close, authorizationConnectionHolder.close])();
        await this.close();
    }
};
launchServer().catch((e) => logger.error(e));
