-- CreateTable
CREATE TABLE "Congestioninsight" (
    "congestioninsightId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Congestioninsight_pkey" PRIMARY KEY ("congestioninsightId")
);
