-- CreateTable
CREATE TABLE "ActCast" (
    "actCastId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "lineId" INTEGER NOT NULL,
    "forward" INTEGER NOT NULL,
    "backward" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActCast_pkey" PRIMARY KEY ("actCastId")
);
