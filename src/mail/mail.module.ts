import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailSyncService } from './mail-sync/mail-sync.service';
import { GraphModule } from './graph/graph.module';
import { MailSyncController } from './mail-sync/mail-sync.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  providers: [MailService, MailSyncService],
  imports: [GraphModule, PrismaModule],
  controllers: [MailSyncController]
})
export class MailModule {}
