/*
  Warnings:

  - You are about to drop the column `professorId` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageURL` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_professorId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "professorId";

-- AlterTable
ALTER TABLE "Professor" ADD COLUMN     "imageURL" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_CourseToProfessor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CourseToProfessor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CourseToProfessor_B_index" ON "_CourseToProfessor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- AddForeignKey
ALTER TABLE "_CourseToProfessor" ADD CONSTRAINT "_CourseToProfessor_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToProfessor" ADD CONSTRAINT "_CourseToProfessor_B_fkey" FOREIGN KEY ("B") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
