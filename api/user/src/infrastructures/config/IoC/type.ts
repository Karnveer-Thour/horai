const TYPES = {
    INFRASTRUCTURES: {
        IDatabaseConnectionHolder: Symbol.for('IDatabaseConnectionHolder'),
        IAuthorizationConnectionHolder: Symbol.for('IAuthorizationConnectionHolder'),
        IEmailProviderConnectionHolder: Symbol.for('IEmailProviderConnectionHolder'),
    },
    REPOSITORIES: {
        DateTimeRepository: Symbol.for('DateTimeRepository'),
        StripeCustomerRepository: Symbol.for('StripeCustomerRepository'),
        AmoRepository: Symbol.for('AmoRepository'),
        SmbRepository: Symbol.for('SmbRepository'),
        UserRepository: Symbol.for('UserRepository'),
        TodoReportRepository: Symbol.for('TodoReportRepository'),
        TodoReportHistoryRepository: Symbol.for('TodoReportHistoryRepository'),
        CustomerRepository: Symbol.for('CustomerRepository'),
        ApplicationCustomerRepository: Symbol.for('ApplicationCustomerRepository'),
        ConnectedCustomerRepository: Symbol.for('ConnectedCustomerRepository'),
        ReservationCustomerRepository: Symbol.for('ReservationCustomerRepository'),
        FirebaseRepository: Symbol.for('FirebaseRepository'),
        UserDeviceTokenRepository: Symbol.for('UserDeviceTokenRepository'),
        DxCoreRepository: Symbol.for('DxCoreRepository'),
        ActCastRepository: Symbol.for('ActCastRepository'),
        EmiPeopleCounterHeadRepository: Symbol.for('EmiPeopleCounterHeadRepository'),
        EmiPeopleCounterHeadCrossRepository: Symbol.for('EmiPeopleCounterHeadCrossRepository'),
        CongestioninsightRepository: Symbol.for('CongestioninsightRepository'),
        BuilMiraiRepository: Symbol.for('BuilMiraiRepository'),
        BuilMiraiDeviceRepository: Symbol.for('BuilMiraiDeviceRepository'),
    },
    SERVICER: {
        EmailSender: Symbol.for('EmailSender'),
    },
};

export { TYPES };
