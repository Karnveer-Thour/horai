-- CreateTable
CREATE TABLE "Smb" (
    "smbId" TEXT NOT NULL,
    "amoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("smbId")
);
