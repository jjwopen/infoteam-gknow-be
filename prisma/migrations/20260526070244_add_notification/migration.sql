-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "emailRawId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_emailRawId_fkey" FOREIGN KEY ("emailRawId") REFERENCES "EmailRaw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
