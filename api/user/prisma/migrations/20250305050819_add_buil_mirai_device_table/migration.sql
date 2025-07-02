-- CreateTable
CREATE TABLE "BuilMiraiDevice" (
    "builMiraiDeviceId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "dataType" TEXT NOT NULL,
    "messageType" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "errorFlg" BOOLEAN NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "dataReceiveDate" TIMESTAMP(3) NOT NULL,
    "createdon" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuilMiraiDevice_pkey" PRIMARY KEY ("builMiraiDeviceId")
);
