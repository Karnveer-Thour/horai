-- CreateTable
CREATE TABLE "ConnectedCustomerDetails" (
    "connectedCustomerDetailsId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "appType" TEXT NOT NULL,
    "connectedCustomerPayload" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConnectedCustomerDetails_pkey" PRIMARY KEY ("connectedCustomerDetailsId")
);

-- AddForeignKey
ALTER TABLE "ConnectedCustomerDetails" ADD CONSTRAINT "ConnectedCustomerDetails_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;
