/*
  Warnings:

  - A unique constraint covering the columns `[nameKorea]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameKorea` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "nameKorea" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Department_nameKorea_key" ON "Department"("nameKorea");

-- CreateIndex
CREATE UNIQUE INDEX "Department_address_key" ON "Department"("address");
