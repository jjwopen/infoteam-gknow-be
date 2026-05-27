import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GraphService } from '../graph/graph.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MailSyncService {

constructor(
    private readonly prisma: PrismaService,
    private readonly graphService: GraphService,
  ) {}

async findAllMails() {
  return this.prisma.emailRaw.findMany({
    orderBy: {
      receivedAt: 'desc',
    },
    select: {
      id: true,
      subject: true,
      senderName: true,
      senderEmail: true,
      bodyPreview: true,
      receivedAt: true,
      hasAttachments: true,
    },
  });
}

async findMailById(id: string) {
  const mail = await this.prisma.emailRaw.findUnique({
    where: { id },
    select: {
      id: true,
      subject: true,
      receivedAt: true,
      bodyHtml: true,
      bodyPreview: true,
      hasAttachments: true,
      attachments: {
        select: {
          id: true,
          fileName: true,
          contentType: true,
          size: true,
        },
      },
    },
  });

  if (!mail) {
    throw new NotFoundException('Mail not found');
  }

  return mail;
}

async downloadAttachment(id: string) {
  const attachment =
    await this.prisma.emailAttachment.findUnique({
      where: { id },
      include: {
        emailRaw: true,
      },
    });

   if (!attachment) {
  throw new NotFoundException('Attachment not found');
  }

  const accessToken =
  await this.graphService.getValidAccessToken();

const graphAttachment =
  await this.graphService.getAttachmentContent(
    accessToken,
    attachment.emailRaw.externalMessageId,
    attachment.externalAttachmentId!,
  );

  const buffer = Buffer.from(
    graphAttachment.contentBytes,
    'base64',
  );

  return {
    fileName: attachment.fileName,
    contentType: attachment.contentType,
    buffer,
  };
}

async findNotifications() {
  return this.prisma.notification.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      message: true,
      isRead: true,
      createdAt: true,
      emailRaw: {
        select: {
          id: true,
          subject: true,
          receivedAt: true,
          hasAttachments: true,
        },
      },
    },
  });
}

async markNotificationAsRead(id: string) {
  const notification =
    await this.prisma.notification.findUnique({
      where: { id },
    });

  if (!notification) {
    throw new NotFoundException('Notification not found');
  }

  return this.prisma.notification.update({
    where: { id },
    data: {
      isRead: true,
    },
  });
}

@Cron('*/5 * * * *')
async handleCron() {
  console.log('자동 메일 동기화 시작');

const accessToken =
  await this.graphService.getValidAccessToken();

const messages =
  await this.graphService.getMessages(accessToken);

await this.graphService.saveMessages(
  messages,
  accessToken,
);

  console.log('메일 동기화 완료');
}

}