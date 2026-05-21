import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { GraphService } from './graph.service';

@Controller('admin/outlook')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get('login')
  async login(@Res() res: Response) {
    const url = await this.graphService.getAuthUrl();
    return res.redirect(url);
  }

  @Get('callback')
  async callback(@Query('code') code: string) {
    const tokenResult = await this.graphService.handleCallback(code);

    const messages = await this.graphService.getMessages(
      tokenResult.accessToken!,
    );

    await this. graphService.saveMessages(messages);

     return {
      message: 'Outlook connected and messages saved successfully',
      connectedAccount:
        tokenResult.account?.username,
     savedCount: messages.length,
    };
  }
}