-- AlterTable
ALTER TABLE "ApplicationCustomerDetail" ADD COLUMN     "city" TEXT DEFAULT E'',
ADD COLUMN     "province" TEXT DEFAULT E'',
ADD COLUMN     "username" TEXT DEFAULT E'';

-- AlterTable
ALTER TABLE "ReservationCustomerDetail" ADD COLUMN     "city" TEXT DEFAULT E'',
ADD COLUMN     "province" TEXT DEFAULT E'',
ADD COLUMN     "username" TEXT DEFAULT E'';

-- RenameIndex
ALTER INDEX "UserPermissionGroup_email_unique" RENAME TO "UserPermissionGroup.email_unique";
