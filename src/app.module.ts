import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessorService } from './professor/professor.service';
import { ProfessorController } from './professor/professor.controller';
import { ProfessorModule } from './professor/professor.module';

@Module({
  imports: [ProfessorModule],
  controllers: [AppController, ProfessorController],
  providers: [AppService, ProfessorService],
})
export class AppModule {}
