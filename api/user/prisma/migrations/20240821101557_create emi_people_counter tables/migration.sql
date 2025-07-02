-- CreateTable
CREATE TABLE "EmiPeopleCounterHead" (
    "emiPeopleCounterHeadId" TEXT NOT NULL,
    "cameraId" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "peopleCount" INTEGER NOT NULL,
    "areaName" TEXT NOT NULL,
    "sendTrigger" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmiPeopleCounterHead_pkey" PRIMARY KEY ("emiPeopleCounterHeadId")
);

-- CreateTable
CREATE TABLE "EmiPeopleCounterHeadCross" (
    "emiPeopleCounterHeadCrossId" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "timestampFrom" TEXT NOT NULL,
    "lineId" TEXT NOT NULL,
    "intoInside" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "elapsedSeconds" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmiPeopleCounterHeadCross_pkey" PRIMARY KEY ("emiPeopleCounterHeadCrossId")
);
