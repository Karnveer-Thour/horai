-- CreateTable
CREATE TABLE "UserDeviceToken" (
    "userDeviceTokenId" TEXT NOT NULL,
    "deviceToken" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("userDeviceTokenId")
);

-- AddForeignKey
ALTER TABLE "UserDeviceToken" ADD FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
