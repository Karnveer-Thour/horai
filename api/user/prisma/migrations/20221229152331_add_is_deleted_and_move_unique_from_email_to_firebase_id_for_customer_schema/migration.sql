/*
  Warnings:

  - A unique constraint covering the columns `[connectedFirebaseId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Customer.email_unique";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Customer.connectedFirebaseId_unique" ON "Customer"("connectedFirebaseId");
