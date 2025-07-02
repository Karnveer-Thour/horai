-- CreateEnum
CREATE TYPE "SocialAccount" AS ENUM ('FACEBOOK', 'TWITTER', 'APPLE', 'GOOGLE', 'EMAIL');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "socialAccount" "SocialAccount" NOT NULL DEFAULT E'EMAIL';
