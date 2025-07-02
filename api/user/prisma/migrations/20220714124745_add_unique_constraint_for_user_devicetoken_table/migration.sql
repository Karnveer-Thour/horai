/*
  Warnings:

  - A unique constraint covering the columns `[email,deviceToken,serviceType]` on the table `UserDeviceToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserDeviceToken.email_deviceToken_serviceType_unique" ON "UserDeviceToken"("email", "deviceToken", "serviceType");
