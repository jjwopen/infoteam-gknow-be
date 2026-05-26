-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_professorId_fkey";

-- AlterTable
ALTER TABLE "Email" ALTER COLUMN "professorId" DROP NOT NULL,
ALTER COLUMN "departmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
