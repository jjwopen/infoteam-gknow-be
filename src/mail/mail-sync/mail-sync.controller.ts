import { Controller, Get, Param, Res, Patch } from '@nestjs/common';
import { MailSyncService } from './mail-sync.service';
import type { Response } from 'express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Mail Sync')
@Controller('mail-sync')
export class MailSyncController {
    constructor(
        private readonly mailSyncService: MailSyncService,
    ) {}

@ApiOperation({
  summary: '메일 목록 조회',
  description: 'DB에 저장된 Outlook 메일 목록을 조회합니다.',
})
@ApiResponse({
  status: 200,
  description: '메일 목록 조회 성공',
})    
@Get('mails')
async getMails() {
    return this.mailSyncService.findAllMails();
}

@ApiOperation({
  summary: '메일 상세 조회',
  description: '메일 본문 HTML, 첨부파일 목록을 포함한 상세 정보를 조회합니다.',
})
@ApiParam({
  name: 'id',
  description: '메일 ID',
})
@ApiResponse({
  status: 200,
  description: '메일 상세 조회 성공',
})
@Get('mails/:id')
async getMailById(@Param('id') id: string) {
  return this.mailSyncService.findMailById(id);
}

@ApiOperation({
  summary: '첨부파일 다운로드',
  description: '메일 첨부파일을 다운로드합니다.',
})
@ApiParam({
  name: 'id',
  description: '첨부파일 ID',
})
@ApiResponse({
  status: 200,
  description: '첨부파일 다운로드 성공',
})
@Get('attachments/:id/download')
async downloadAttachment(
  @Param('id') id: string,
  @Res() res: Response,
) {
  const file =
    await this.mailSyncService.downloadAttachment(id);

  const encodedFileName = encodeURIComponent(
  file.fileName ?? 'attachment',
  );

  res.setHeader(
  'Content-Disposition',
  `attachment; filename="attachment"; filename*=UTF-8''${encodedFileName}`,
  );

  res.setHeader(
  'Content-Type',
  file.contentType ?? 'application/octet-stream',
  );

  return res.send(file.buffer);
}


@ApiOperation({
  summary: '알림 목록 조회',
  description: '새 메일로 생성된 알림 목록을 조회합니다.',
})
@ApiResponse({
  status: 200,
  description: '알림 목록 조회 성공',
})
@Get('notifications')
async getNotifications() {
  return this.mailSyncService.findNotifications();
}

@ApiOperation({
  summary: '알림 읽음 처리',
  description: '알림을 읽음 상태로 변경합니다.',
})
@ApiParam({
  name: 'id',
  description: '알림 ID',
})
@ApiResponse({
  status: 200,
  description: '알림 읽음 처리 성공',
})
@Patch('notifications/:id/read')
async readNotification(@Param('id') id: string) {
  return this.mailSyncService.markNotificationAsRead(id);
}

}
