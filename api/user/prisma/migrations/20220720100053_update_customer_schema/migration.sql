-- AlterTable
ALTER TABLE "ApplicationCustomerDetail" ADD COLUMN     "pronounceFirstName" TEXT DEFAULT E'',
ADD COLUMN     "pronounceLastName" TEXT DEFAULT E'';

-- AlterTable
ALTER TABLE "ReservationCustomerDetail" ADD COLUMN     "pronounceFirstName" TEXT DEFAULT E'',
ADD COLUMN     "pronounceLastName" TEXT DEFAULT E'';
