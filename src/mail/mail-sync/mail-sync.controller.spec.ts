import { Test, TestingModule } from '@nestjs/testing';
import { MailSyncController } from './mail-sync.controller';

describe('MailSyncController', () => {
  let controller: MailSyncController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailSyncController],
    }).compile();

    controller = module.get<MailSyncController>(MailSyncController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
