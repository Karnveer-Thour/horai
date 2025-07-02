const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createUsers() {
    const date = '2021-01-01T00:00:00.000Z';
    for (let i = 0; i < 20; i++) {
        await prisma.user.upsert({
            where: { email: `user${i}@gmail.com` },
            update: {},
            create: {
                email: `user${i}@gmail.com`,
                userId: i + '',
                role: 'sv',
                amoId: 'amo id',
                smbId: 'smb id',
                createdAt: date,
                updatedAt: date,
            },
        });
    }
    await prisma.amo.upsert({
        where: { amoId: 'amo id' },
        update: {},
        create: {
            amoId: 'amo id',
            name: 'name',
            email: 'test',
            createdAt: date,
            updatedAt: date,
        },
    });
    await prisma.smb.upsert({
        where: { smbId: 'smb id' },
        update: {},
        create: {
            smbId: 'smb id',
            amoId: 'amo id',
            name: 'name',
            email: 'testsmb@horai.com',
            createdAt: date,
            updatedAt: date,
        },
    });
}

async function seed() {
    try {
        await createUsers();
    } finally {
        prisma.$disconnect();
    }
}

module.exports = {
    seed,
};
