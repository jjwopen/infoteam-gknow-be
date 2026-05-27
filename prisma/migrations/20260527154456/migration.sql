/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Email` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Facility` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Professor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfessorDepartment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseToProfessor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_professorId_fkey";

-- DropForeignKey
ALTER TABLE "ProfessorDepartment" DROP CONSTRAINT "ProfessorDepartment_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "ProfessorDepartment" DROP CONSTRAINT "ProfessorDepartment_professorId_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToProfessor" DROP CONSTRAINT "_CourseToProfessor_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToProfessor" DROP CONSTRAINT "_CourseToProfessor_B_fkey";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "Email";

-- DropTable
DROP TABLE "Facility";

-- DropTable
DROP TABLE "Professor";

-- DropTable
DROP TABLE "ProfessorDepartment";

-- DropTable
DROP TABLE "_CourseToProfessor";
