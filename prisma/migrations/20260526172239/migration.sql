/*
  Warnings:

  - Added the required column `nameKorea` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Professor" ADD COLUMN     "nameKorea" TEXT NOT NULL;
