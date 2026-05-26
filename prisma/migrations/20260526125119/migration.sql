/*
  Warnings:

  - You are about to drop the `Email` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_professorId_fkey";

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "emails" TEXT[];

-- AlterTable
ALTER TABLE "Professor" ADD COLUMN     "emails" TEXT[];

-- DropTable
DROP TABLE "Email";
