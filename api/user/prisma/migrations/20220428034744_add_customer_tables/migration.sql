-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('GUEST', 'REGULAR');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('CoWorkingSpace', 'Reservation', 'Application');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" TEXT NOT NULL,
    "connectedFirebaseId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "ReservationCustomerDetail" (
    "reservationCustomerDetailId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "customerType" "CustomerType" NOT NULL DEFAULT E'REGULAR',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT DEFAULT E'',
    "nickname" TEXT DEFAULT E'',
    "dateOfBirth" TEXT DEFAULT E'',
    "postCode" TEXT DEFAULT E'',
    "gender" "GenderType",
    "residenceArea" TEXT DEFAULT E'',
    "acceptDirectMail" BOOLEAN NOT NULL DEFAULT false,
    "emailAddress" TEXT DEFAULT E'',
    "language" TEXT DEFAULT E'ja',
    "phoneNumber" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("reservationCustomerDetailId")
);

-- CreateTable
CREATE TABLE "ApplicationCustomerDetail" (
    "reservationCustomerDetailId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "customerType" "CustomerType" NOT NULL DEFAULT E'REGULAR',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT DEFAULT E'',
    "nickname" TEXT DEFAULT E'',
    "dateOfBirth" TEXT DEFAULT E'',
    "postCode" TEXT DEFAULT E'',
    "gender" "GenderType",
    "residenceArea" TEXT DEFAULT E'',
    "acceptDirectMail" BOOLEAN NOT NULL DEFAULT false,
    "emailAddress" TEXT DEFAULT E'',
    "language" TEXT DEFAULT E'ja',
    "phoneNumber" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("reservationCustomerDetailId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReservationCustomerDetail.customerId_unique" ON "ReservationCustomerDetail"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationCustomerDetail.customerId_unique" ON "ApplicationCustomerDetail"("customerId");

-- AddForeignKey
ALTER TABLE "ReservationCustomerDetail" ADD FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationCustomerDetail" ADD FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE CASCADE ON UPDATE CASCADE;
