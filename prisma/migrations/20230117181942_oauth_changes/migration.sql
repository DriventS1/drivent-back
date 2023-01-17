/*
  Warnings:

  - A unique constraint covering the columns `[dateId]` on the table `Activities` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Activities_dateId_key" ON "Activities"("dateId");

-- CreateIndex
CREATE INDEX "Activities_dateId_idx" ON "Activities"("dateId");

-- CreateIndex
CREATE INDEX "DateActivity_id_idx" ON "DateActivity"("id");
