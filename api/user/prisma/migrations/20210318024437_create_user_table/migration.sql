CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "userId" TEXT,
    "role" TEXT,
    "amoId" TEXT,
    "smbId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("email")
);
