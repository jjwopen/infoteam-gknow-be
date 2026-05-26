/*
  Warnings:

  - You are about to drop the column `email` on the `Email` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address]` on the table `Email` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Email_email_key";

-- AlterTable
ALTER TABLE "Email" DROP COLUMN "email",
ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Email_address_key" ON "Email"("address");
