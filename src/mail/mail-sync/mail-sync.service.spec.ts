import { Test, TestingModule } from '@nestjs/testing';
import { MailSyncService } from './mail-sync.service';

describe('MailSyncService', () => {
  let service: MailSyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailSyncService],
    }).compile();

    service = module.get<MailSyncService>(MailSyncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
