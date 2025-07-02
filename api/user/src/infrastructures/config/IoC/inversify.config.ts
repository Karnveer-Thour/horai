import { Prisma, PrismaClient } from '@prisma/client';
import { Container } from 'inversify';
import * as nodemailer from 'nodemailer';
import 'reflect-metadata';
import { IDatabaseConnectionHolder } from '../../database/IDatabaseConnectionHolder';
import { PrismaDBConnectionHolder } from '../../database/PrismaDBConnectionHolder';
import { TYPES } from './type';

import { SystemDateTimeRepository } from '../../../adapters/gateways/repositories/SystemDateTimeRepository';
import { DateTimeRepository } from '../../../usecases/repositories/DateTimeRepository';

import { PostgresAmoRepository } from '../../../adapters/gateways/repositories/postgres/PostgresAmoRepository';
import { AmoRepository } from '../../../usecases/repositories/AmoRepository';

import { PostgresSmbRepository } from '../../../adapters/gateways/repositories/postgres/PostgresSmbRepository';
import { SmbRepository } from '../../../usecases/repositories/SmbRepository';

import { PostgresCustomerRepository } from '../../../adapters/gateways/repositories/postgres/PostgresCustomerRepository';
import { CustomerRepository } from '../../../usecases/repositories/CustomerRepository';

import { PostgresApplicationCustomerRepository } from '../../../adapters/gateways/repositories/postgres/PostgresApplicationCustomerRepository';
import { ApplicationCustomerRepository } from '../../../usecases/repositories/ApplicationCustomerRepository';

import { ConnectedCustomerRepository } from '../../../usecases/repositories/ConnectedCustomerRepository';

import { PostgresReservationCustomerRepository } from '../../../adapters/gateways/repositories/postgres/PostgresReservationCustomerRepository';
import { ReservationCustomerRepository } from '../../../usecases/repositories/ReservationCustomerRepository';

import { PostgresUserDeviceTokenRepository } from '../../../adapters/gateways/repositories/postgres/PostgresUserDeviceTokenRepository';
import { UserDeviceTokenRepository } from '../../../usecases/repositories/UserDeviceTokenRepository';

import { FirebaseRepositoryImpl } from '../../../adapters/gateways/repositories/FirebaseRepositoryImpl';
import { FirebaseRepository } from '../../../usecases/repositories/FirebaseRepository';

import { GmailEmailSender } from '../../../adapters/gateways/repositories/GmailEmailSender';
import { EmailSender } from '../../../usecases/servicer/EmailSender';

import { IEmailProviderConnectionHolder } from '../../emailProvider/IEmailProviderConnectionHolder';
import { NodeMailerTransportConnectionHolder } from '../../emailProvider/NodeMailerTransportConnectionHolder';

// import { Enforcer } from 'casbin/lib/cjs/enforcer';
import { Enforcer } from 'casbin';
import { StripeCustomerRepositoryImpl } from '../../../adapters/gateways/repositories/postgres/StripeCustomerRepositoryImpl';
import { StripeCustomerRepository } from '../../../usecases/repositories/StripeCustomerRepository';
import { CasbinConnectionHolder } from '../../authorization/CasbinConnectionHolder';
import { IAuthorizationConnectionHolder } from '../../authorization/IAuthorizationConnectionHolder';
import { PostgresConnectedCustomerRepository } from '../../../adapters/gateways/repositories/postgres/PostgresConnectedCustomerRepository';
import { DxCoreRepository } from '../../../usecases/repositories/DxCoreRepository';
import { DxCoreRepositoryImpl } from '../../../adapters/gateways/repositories/postgres/DxCoreRepositoryImpl';
import { ActCastRepository } from '../../../usecases/repositories/ActCast';
import { PostgresActCastRepository } from '../../../adapters/gateways/repositories/postgres/PostgresActCastRepository';
import { PostgresEmiPeopleCounterHeadRepository } from '../../../adapters/gateways/repositories/postgres/PostgresEmiPeopleCounterHeadRepository';
import { EmiPeopleCounterHeadRepository } from '../../../usecases/repositories/EmiPeopleCounterHead';
import { PostgresEmiPeopleCounterHeadCrossRepository } from '../../../adapters/gateways/repositories/postgres/PostgresEmiPeopleCounterHeadCrossRepository';
import { EmiPeopleCounterHeadCrossRepository } from '../../../usecases/repositories/EmiPeopleCounterHeadCross';
import { CongestioninsightRepository } from '../../../usecases/repositories/CongestioninsightRepository';
import { PostgresCongestioninsightRepository } from '../../../adapters/gateways/repositories/postgres/PostgresCongestioninsightRepository';
import { BuilMiraiRepository } from '../../../usecases/repositories/BuilMiraiRepository';
import { BuilMiraiRepositoryImpl } from '../../../adapters/gateways/repositories/postgres/BuilMiraiRepositoryImpl';
import { BuilMiraiDeviceRepository } from '../../../usecases/repositories/BuilMiraiDeviceRepository';
import { PostgresBuilMiraiDeviceRepository } from '../../../adapters/gateways/repositories/postgres/PostgresBuilMiraiDeviceRepository';
import { TodoReportRepository } from '../../../usecases/repositories/TodoReportRepository';
import { PostgresTodoReportRepository } from '../../../adapters/gateways/repositories/postgres/PostgresTodoReportRepository';
import { UserRepository } from '../../../usecases/repositories/UserRepository';
import { PostgresUserRepository } from '../../../adapters/gateways/repositories/postgres/PostgresUserRepository';

const rootContainer = new Container();

rootContainer
    .bind<IDatabaseConnectionHolder<PrismaClient<Prisma.PrismaClientOptions, never>>>(
        TYPES.INFRASTRUCTURES.IDatabaseConnectionHolder,
    )
    .to(PrismaDBConnectionHolder);

rootContainer
    .bind<IAuthorizationConnectionHolder<Enforcer>>(TYPES.INFRASTRUCTURES.IAuthorizationConnectionHolder)
    .to(CasbinConnectionHolder);

rootContainer
    .bind<IEmailProviderConnectionHolder<Omit<nodemailer.Transporter, 'close'>>>(
        TYPES.INFRASTRUCTURES.IEmailProviderConnectionHolder,
    )
    .to(NodeMailerTransportConnectionHolder);

rootContainer.bind<DateTimeRepository>(TYPES.REPOSITORIES.DateTimeRepository).to(SystemDateTimeRepository);
rootContainer
    .bind<StripeCustomerRepository>(TYPES.REPOSITORIES.StripeCustomerRepository)
    .to(StripeCustomerRepositoryImpl);
rootContainer.bind<AmoRepository>(TYPES.REPOSITORIES.AmoRepository).to(PostgresAmoRepository);
rootContainer.bind<SmbRepository>(TYPES.REPOSITORIES.SmbRepository).to(PostgresSmbRepository);
rootContainer.bind<CustomerRepository>(TYPES.REPOSITORIES.CustomerRepository).to(PostgresCustomerRepository);
rootContainer.bind<UserRepository>(TYPES.REPOSITORIES.UserRepository).to(PostgresUserRepository);
rootContainer.bind<TodoReportRepository>(TYPES.REPOSITORIES.TodoReportRepository).to(PostgresTodoReportRepository);
rootContainer
    .bind<ReservationCustomerRepository>(TYPES.REPOSITORIES.ReservationCustomerRepository)
    .to(PostgresReservationCustomerRepository);
rootContainer
    .bind<ApplicationCustomerRepository>(TYPES.REPOSITORIES.ApplicationCustomerRepository)
    .to(PostgresApplicationCustomerRepository);
rootContainer
    .bind<ConnectedCustomerRepository>(TYPES.REPOSITORIES.ConnectedCustomerRepository)
    .to(PostgresConnectedCustomerRepository);
rootContainer
    .bind<UserDeviceTokenRepository>(TYPES.REPOSITORIES.UserDeviceTokenRepository)
    .to(PostgresUserDeviceTokenRepository);
rootContainer.bind<FirebaseRepository>(TYPES.REPOSITORIES.FirebaseRepository).to(FirebaseRepositoryImpl);
rootContainer.bind<DxCoreRepository>(TYPES.REPOSITORIES.DxCoreRepository).to(DxCoreRepositoryImpl);
rootContainer.bind<ActCastRepository>(TYPES.REPOSITORIES.ActCastRepository).to(PostgresActCastRepository);
rootContainer
    .bind<EmiPeopleCounterHeadRepository>(TYPES.REPOSITORIES.EmiPeopleCounterHeadRepository)
    .to(PostgresEmiPeopleCounterHeadRepository);
rootContainer
    .bind<CongestioninsightRepository>(TYPES.REPOSITORIES.CongestioninsightRepository)
    .to(PostgresCongestioninsightRepository);
rootContainer
    .bind<EmiPeopleCounterHeadCrossRepository>(TYPES.REPOSITORIES.EmiPeopleCounterHeadCrossRepository)
    .to(PostgresEmiPeopleCounterHeadCrossRepository);
rootContainer.bind<BuilMiraiRepository>(TYPES.REPOSITORIES.BuilMiraiRepository).to(BuilMiraiRepositoryImpl);
rootContainer
    .bind<BuilMiraiDeviceRepository>(TYPES.REPOSITORIES.BuilMiraiDeviceRepository)
    .to(PostgresBuilMiraiDeviceRepository);

// SET servicers
rootContainer.bind<EmailSender>(TYPES.SERVICER.EmailSender).to(GmailEmailSender);

// get repositories instances

const dateTimeRepository = rootContainer.get<DateTimeRepository>(TYPES.REPOSITORIES.DateTimeRepository);
const stripeCustomerRepository = rootContainer.get<StripeCustomerRepository>(
    TYPES.REPOSITORIES.StripeCustomerRepository,
);
const amoRepository = rootContainer.get<AmoRepository>(TYPES.REPOSITORIES.AmoRepository);
const todoReportRepository = rootContainer.get<TodoReportRepository>(TYPES.REPOSITORIES.TodoReportRepository);
const smbRepository = rootContainer.get<SmbRepository>(TYPES.REPOSITORIES.SmbRepository);
const userRepository = rootContainer.get<UserRepository>(TYPES.REPOSITORIES.UserRepository);
const customerRepository = rootContainer.get<CustomerRepository>(TYPES.REPOSITORIES.CustomerRepository);
const applicationCustomerRepository = rootContainer.get<ApplicationCustomerRepository>(
    TYPES.REPOSITORIES.ApplicationCustomerRepository,
);
const connectedCustomerRepository = rootContainer.get<ConnectedCustomerRepository>(
    TYPES.REPOSITORIES.ConnectedCustomerRepository,
);
const reservationCustomerRepository = rootContainer.get<ReservationCustomerRepository>(
    TYPES.REPOSITORIES.ReservationCustomerRepository,
);
const userDeviceTokenRepository = rootContainer.get<UserDeviceTokenRepository>(
    TYPES.REPOSITORIES.UserDeviceTokenRepository,
);
const firebaseRepository = rootContainer.get<FirebaseRepository>(TYPES.REPOSITORIES.FirebaseRepository);
const dxCoreRepository = rootContainer.get<DxCoreRepository>(TYPES.REPOSITORIES.DxCoreRepository);
const actCastRepository = rootContainer.get<ActCastRepository>(TYPES.REPOSITORIES.ActCastRepository);
const emiPeopleCounterHeadRepository = rootContainer.get<EmiPeopleCounterHeadRepository>(
    TYPES.REPOSITORIES.EmiPeopleCounterHeadRepository,
);
const congestioninsightRepositoryRepository = rootContainer.get<CongestioninsightRepository>(
    TYPES.REPOSITORIES.CongestioninsightRepository,
);
const emiPeopleCounterHeadCrossRepository = rootContainer.get<EmiPeopleCounterHeadCrossRepository>(
    TYPES.REPOSITORIES.EmiPeopleCounterHeadCrossRepository,
);
const builMiraiRepository = rootContainer.get<BuilMiraiRepository>(TYPES.REPOSITORIES.BuilMiraiRepository);
const builMiraiDeviceRepository = rootContainer.get<BuilMiraiDeviceRepository>(
    TYPES.REPOSITORIES.BuilMiraiDeviceRepository,
);

const dbConnection = rootContainer.get<IDatabaseConnectionHolder<PrismaClient<Prisma.PrismaClientOptions, never>>>(
    TYPES.INFRASTRUCTURES.IDatabaseConnectionHolder,
);
const authorizationConnectionHolder = rootContainer.get<IAuthorizationConnectionHolder<Enforcer>>(
    TYPES.INFRASTRUCTURES.IAuthorizationConnectionHolder,
);

// GET email connection instances
const emailProviderConnectionHolder = rootContainer.get<
    IEmailProviderConnectionHolder<Omit<nodemailer.Transporter, 'close'>>
>(TYPES.INFRASTRUCTURES.IEmailProviderConnectionHolder);

// get servicers instances
const emailSender = rootContainer.get<EmailSender>(TYPES.SERVICER.EmailSender);

export {
    rootContainer,
    dbConnection,
    authorizationConnectionHolder,
    dateTimeRepository,
    stripeCustomerRepository,
    todoReportRepository,
    userRepository,
    amoRepository,
    smbRepository,
    customerRepository,
    applicationCustomerRepository,
    connectedCustomerRepository,
    reservationCustomerRepository,
    userDeviceTokenRepository,
    firebaseRepository,
    emailSender,
    emailProviderConnectionHolder,
    dxCoreRepository,
    actCastRepository,
    emiPeopleCounterHeadRepository,
    emiPeopleCounterHeadCrossRepository,
    congestioninsightRepositoryRepository,
    builMiraiRepository,
    builMiraiDeviceRepository,
};
