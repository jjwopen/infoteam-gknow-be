-- CreateTable
CREATE TABLE "EmailRaw" (
    "id" TEXT NOT NULL,
    "externalMessageId" TEXT NOT NULL,
    "subject" TEXT,
    "senderName" TEXT,
    "senderEmail" TEXT,
    "receivedAt" TIMESTAMP(3),
    "bodyHtml" TEXT,
    "bodyText" TEXT,
    "bodyPreview" TEXT,
    "renderedHtml" TEXT,
    "hasAttachments" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailRaw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailAttachment" (
    "id" TEXT NOT NULL,
    "emailRawId" TEXT NOT NULL,
    "externalAttachmentId" TEXT,
    "fileName" TEXT NOT NULL,
    "contentType" TEXT,
    "size" INTEGER,
    "storageUrl" TEXT NOT NULL,
    "storageKey" TEXT,
    "isInline" BOOLEAN NOT NULL DEFAULT false,
    "contentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MailSyncState" (
    "id" TEXT NOT NULL,
    "deltaToken" TEXT,
    "lastSyncedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MailSyncState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MailSyncLog" (
    "id" TEXT NOT NULL,
    "syncStartedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "syncFinishedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "fetchedCount" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,

    CONSTRAINT "MailSyncLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailRaw_externalMessageId_key" ON "EmailRaw"("externalMessageId");

-- CreateIndex
CREATE INDEX "EmailRaw_receivedAt_idx" ON "EmailRaw"("receivedAt");

-- CreateIndex
CREATE INDEX "EmailAttachment_emailRawId_idx" ON "EmailAttachment"("emailRawId");

-- CreateIndex
CREATE INDEX "EmailAttachment_contentId_idx" ON "EmailAttachment"("contentId");

-- AddForeignKey
ALTER TABLE "EmailAttachment" ADD CONSTRAINT "EmailAttachment_emailRawId_fkey" FOREIGN KEY ("emailRawId") REFERENCES "EmailRaw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
