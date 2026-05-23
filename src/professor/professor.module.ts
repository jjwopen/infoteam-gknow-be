import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfessorController } from './professor.controller';
import { Repository } from './repository';
import { ProfessorService } from './professor.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProfessorController],
  providers: [ProfessorService, Repository],
})
export class ProfessorModule {}
