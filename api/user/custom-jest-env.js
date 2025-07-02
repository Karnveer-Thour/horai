const NodeEnvironment = require('jest-environment-node');
const { PrismaClient } = require('@prisma/client');
const { seed } = require('./prisma/seedForTest');

class CustomEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
        this.testPath = context.testPath;
        this.prisma = new PrismaClient();
    }

    async setup() {
        await super.setup();
        this.global.prisma = this.prisma;
        await this.deleteAllData();
        await seed();
    }

    async teardown() {
        await this.deleteAllData();
        await this.global.prisma.$disconnect();
        await super.teardown();
    }

    deleteAllData = async () => {
        try {
            await this.prisma.applicationCustomerDetail.deleteMany();
            await this.prisma.reservationCustomerDetail.deleteMany();
            await this.prisma.customer.deleteMany();

            await this.prisma.smb.deleteMany();
            await this.prisma.amo.deleteMany();

            await this.prisma.user.deleteMany();
        } finally {
            this.prisma.$disconnect();
        }
    };

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = CustomEnvironment;
