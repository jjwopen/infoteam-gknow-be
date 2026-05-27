-- CreateTable
CREATE TABLE "IgnoredEmail" (
    "id" TEXT NOT NULL,
    "externalMessageId" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IgnoredEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IgnoredEmail_externalMessageId_key" ON "IgnoredEmail"("externalMessageId");
