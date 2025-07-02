-- DropForeignKey
ALTER TABLE "ApplicationCustomerDetail" DROP CONSTRAINT "ApplicationCustomerDetail_customerId_fkey";

-- DropForeignKey
ALTER TABLE "ReservationCustomerDetail" DROP CONSTRAINT "ReservationCustomerDetail_customerId_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "bizUserId" TEXT DEFAULT '',
ADD COLUMN     "isBizUser" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "ReservationCustomerDetail" ADD CONSTRAINT "ReservationCustomerDetail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationCustomerDetail" ADD CONSTRAINT "ApplicationCustomerDetail_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "ApplicationCustomerDetail.customerId_unique" RENAME TO "ApplicationCustomerDetail_customerId_key";

-- RenameIndex
ALTER INDEX "Customer.connectedFirebaseId_unique" RENAME TO "Customer_connectedFirebaseId_key";

-- RenameIndex
ALTER INDEX "ReservationCustomerDetail.customerId_unique" RENAME TO "ReservationCustomerDetail_customerId_key";

-- RenameIndex
ALTER INDEX "UserDeviceToken.email_deviceToken_serviceType_unique" RENAME TO "UserDeviceToken_email_deviceToken_serviceType_key";
