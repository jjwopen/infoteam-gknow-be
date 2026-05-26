/*
  Warnings:

  - You are about to drop the column `email` on the `Professor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Professor_email_key";

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "email",
ALTER COLUMN "imageURL" SET DEFAULT 'https://example.com/default-image.jpg';

-- CreateTable
CREATE TABLE "email" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "professorId" INTEGER NOT NULL,

    CONSTRAINT "email_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_email_key" ON "email"("email");

-- AddForeignKey
ALTER TABLE "email" ADD CONSTRAINT "email_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
