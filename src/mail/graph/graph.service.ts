import { Injectable } from '@nestjs/common';
import * as msal from '@azure/msal-node';
import axios from 'axios';
import { PrismaService } from 'prisma/prisma.service';

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

  async saveMessages(messages: any[]) {
  for (const message of messages) {
    await this.prisma.emailRaw.upsert({
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
  }
}
}