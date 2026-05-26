/*
  Warnings:

  - You are about to drop the column `number` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the `_DepartmentToProfessor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DepartmentToProfessor" DROP CONSTRAINT "_DepartmentToProfessor_A_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentToProfessor" DROP CONSTRAINT "_DepartmentToProfessor_B_fkey";

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "number";

-- DropTable
DROP TABLE "_DepartmentToProfessor";

-- CreateTable
CREATE TABLE "ProfessorDepartment" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,

    CONSTRAINT "ProfessorDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfessorDepartment_number_key" ON "ProfessorDepartment"("number");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessorDepartment_professorId_departmentId_key" ON "ProfessorDepartment"("professorId", "departmentId");

-- AddForeignKey
ALTER TABLE "ProfessorDepartment" ADD CONSTRAINT "ProfessorDepartment_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorDepartment" ADD CONSTRAINT "ProfessorDepartment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
