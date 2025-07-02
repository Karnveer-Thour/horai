/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Smb` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ResourceEnum" AS ENUM ('CoWorkingSpace', 'Activity');

-- AlterTable
ALTER TABLE "Smb" DROP COLUMN "imageUrl",
ADD COLUMN     "cancelationPolicy" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "precaution" TEXT,
ADD COLUMN     "resourceType" "ResourceEnum" NOT NULL DEFAULT E'Activity';
