/*
  Warnings:

  - The `number` column on the `Professor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Professor_number_key";

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER[];
