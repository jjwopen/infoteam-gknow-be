import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailSyncService } from './mail-sync/mail-sync.service';
import { GraphModule } from './graph/graph.module';

@Module({
  providers: [MailService, MailSyncService],
  imports: [GraphModule]
})
export class MailModule {}
