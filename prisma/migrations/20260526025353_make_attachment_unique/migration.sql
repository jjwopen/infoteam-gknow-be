/*
  Warnings:

  - A unique constraint covering the columns `[externalAttachmentId]` on the table `EmailAttachment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmailAttachment_externalAttachmentId_key" ON "EmailAttachment"("externalAttachmentId");
