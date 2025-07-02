/*
  Warnings:

  - The primary key for the `ApplicationCustomerDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reservationCustomerDetailId` on the `ApplicationCustomerDetail` table. All the data in the column will be lost.
  - Added the required column `applicationCustomerDetailId` to the `ApplicationCustomerDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplicationCustomerDetail" DROP CONSTRAINT "ApplicationCustomerDetail_pkey",
DROP COLUMN "reservationCustomerDetailId",
ADD COLUMN     "applicationCustomerDetailId" TEXT NOT NULL,
ADD PRIMARY KEY ("applicationCustomerDetailId");
