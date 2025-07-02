-- CreateTable
CREATE TABLE "TodoReport" (
    "reportId" TEXT NOT NULL,
    "smbId" TEXT NOT NULL,
    "reportLink" TEXT NOT NULL,
    "reportType" "ReportType" NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TodoReport_pkey" PRIMARY KEY ("reportId")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_smbId_fkey" FOREIGN KEY ("smbId") REFERENCES "Smb"("smbId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoReport" ADD CONSTRAINT "TodoReport_smbId_fkey" FOREIGN KEY ("smbId") REFERENCES "Smb"("smbId") ON DELETE RESTRICT ON UPDATE CASCADE;
