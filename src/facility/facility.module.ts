import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FacilityController } from './facility.controller';
import { FacilityService } from './facility.service';
import { Repository } from './repository';

@Module({
  imports: [PrismaService],
  controllers: [FacilityController],
  providers: [FacilityService, Repository],
})
export class FacilityModule {}
