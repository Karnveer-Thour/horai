/*
  Warnings: DUY ALREADY CHECKED IT WILL NOT BE FAILED!

  - A unique constraint covering the columns `[name]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Resource.name_unique" ON "Resource"("name");
