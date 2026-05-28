import { Injectable } from '@nestjs/common';
import * as msal from '@azure/msal-node';
import axios from 'axios';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GraphService {
  constructor(private readonly prisma: PrismaService) {}
  private msalClient = new msal.ConfidentialClientApplication({
    auth: {
      clientId: process.env.AZURE_CLIENT_ID!,
      authority: 'https://login.microsoftonline.com/consumers',
      clientSecret: process.env.AZURE_CLIENT_SECRET!,
    },
  });

  async getAuthUrl() {
    return this.msalClient.getAuthCodeUrl({
      scopes: ['User.Read', 'Mail.Read', 'offline_access'],
      redirectUri: process.env.REDIRECT_URI!,
    });
  }

  async handleCallback(code: string) {
    const tokenResult = await this.msalClient.acquireTokenByCode({
      code,
      scopes: ['User.Read', 'Mail.Read', 'offline_access'],
      redirectUri: process.env.REDIRECT_URI!,
    });

    return tokenResult;
  }

  async getMessages(accessToken: string) {
    const response = await axios.get(
      'https://graph.microsoft.com/v1.0/me/messages?$top=10',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.value;
  }

  async saveMessages(messages: any[], accessToken: string) {
    for (const message of messages) {
      const ignoredMail = await this.prisma.ignoredEmail.findUnique({
        where: {
          externalMessageId: message.id,
        },
      });

      if (ignoredMail) {
        continue;
      }

      const existingMail = await this.prisma.emailRaw.findUnique({
        where: {
          externalMessageId: message.id,
        },
      });

      const savedMail = await this.prisma.emailRaw.upsert({
        where: {
          externalMessageId: message.id,
        },
        update: {
          subject: message.subject,
          senderName: message.from?.emailAddress?.name,
          senderEmail: message.from?.emailAddress?.address,
          receivedAt: message.receivedDateTime
            ? new Date(message.receivedDateTime)
            : null,
          bodyHtml: message.body?.content,
          bodyText: null,
          bodyPreview: message.bodyPreview,
          hasAttachments: message.hasAttachments ?? false,
        },
        create: {
          externalMessageId: message.id,
          subject: message.subject,
          senderName: message.from?.emailAddress?.name,
          senderEmail: message.from?.emailAddress?.address,
          receivedAt: message.receivedDateTime
            ? new Date(message.receivedDateTime)
            : null,
          bodyHtml: message.body?.content,
          bodyText: null,
          bodyPreview: message.bodyPreview,
          hasAttachments: message.hasAttachments ?? false,
        },
      });

      if (!existingMail) {
        console.log('Notification 생성:', message.subject);

        await this.prisma.notification.create({
          data: {
            emailRawId: savedMail.id,
            title: message.subject ?? '새 메일이 도착했습니다',
            message: message.bodyPreview,
          },
        });
      }

      if (message.hasAttachments) {
        const attachments = await this.getAttachments(accessToken, message.id);

        for (const attachment of attachments) {
          await this.prisma.emailAttachment.upsert({
            where: {
              externalAttachmentId: attachment.id,
            },
            update: {
              fileName: attachment.name,
              contentType: attachment.contentType,
              size: attachment.size,
              isInline: attachment.isInline ?? false,
              contentId: attachment.contentId,
            },
            create: {
              emailRawId: savedMail.id,
              externalAttachmentId: attachment.id,
              fileName: attachment.name,
              contentType: attachment.contentType,
              size: attachment.size,
              storageUrl: '',
              storageKey: null,
              isInline: attachment.isInline ?? false,
              contentId: attachment.contentId,
            },
          });
        }
      }
    }
  }

  async getAttachments(accessToken: string, messageId: string) {
    const response = await axios.get(
      `https://graph.microsoft.com/v1.0/me/messages/${messageId}/attachments`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data.value;
  }

  async saveOutlookToken(tokenResult: any) {
    const cache = this.msalClient.getTokenCache().serialize();

    await this.prisma.outlookToken.upsert({
      where: {
        accountEmail: tokenResult.account?.username,
      },
      update: {
        accessToken: tokenResult.accessToken,
        refreshToken: tokenResult.refreshToken,
        expiresAt: tokenResult.expiresOn,
        homeAccountId: tokenResult.account?.homeAccountId,
        tokenCache: cache,
      },
      create: {
        accountEmail: tokenResult.account?.username,
        accessToken: tokenResult.accessToken,
        refreshToken: tokenResult.refreshToken,
        expiresAt: tokenResult.expiresOn,
        homeAccountId: tokenResult.account?.homeAccountId,
        tokenCache: cache,
      },
    });
  }

  async getSavedOutlookToken() {
    return this.prisma.outlookToken.findFirst({
      where: {
        accountEmail: 'gknow2026@outlook.com',
      },
    });
  }

  async getAttachmentContent(
    accessToken: string,
    messageId: string,
    attachmentId: string,
  ) {
    const response = await axios.get(
      `https://graph.microsoft.com/v1.0/me/messages/${encodeURIComponent(messageId)}/attachments/${encodeURIComponent(attachmentId)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  }

  async getValidAccessToken() {
    const saved = await this.prisma.outlookToken.findFirst({
      where: {
        accountEmail: 'gknow2026@outlook.com',
      },
    });

    if (!saved?.tokenCache || !saved.homeAccountId) {
      throw new Error('Outlook token cache not found');
    }

    this.msalClient.getTokenCache().deserialize(saved.tokenCache);

    const account = await this.msalClient
      .getTokenCache()
      .getAccountByHomeId(saved.homeAccountId);

    if (!account) {
      throw new Error('MSAL account not found');
    }

    const result = await this.msalClient.acquireTokenSilent({
      account,
      scopes: ['User.Read', 'Mail.Read', 'offline_access'],
    });

    const newCache = this.msalClient.getTokenCache().serialize();

    await this.prisma.outlookToken.update({
      where: {
        accountEmail: saved.accountEmail,
      },
      data: {
        accessToken: result?.accessToken,
        expiresAt: result?.expiresOn,
        tokenCache: newCache,
      },
    });

    return result?.accessToken;
  }
}
