/*
  Warnings:

  - You are about to drop the column `dataStudioReportLinks` on the `Smb` table. All the data in the column will be lost.
  - You are about to drop the column `pdfReportLinks` on the `Smb` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('PDF', 'LookerStudio');

-- AlterTable
ALTER TABLE "Smb" DROP COLUMN "dataStudioReportLinks",
DROP COLUMN "pdfReportLinks";

-- CreateTable
CREATE TABLE "Report" (
    "reportId" TEXT NOT NULL,
    "smbId" TEXT NOT NULL,
    "reportLink" TEXT NOT NULL,
    "reportType" "ReportType" NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("reportId")
);
