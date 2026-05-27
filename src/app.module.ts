import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessorService } from './professor/professor.service';
import { ProfessorController } from './professor/professor.controller';
import { ProfessorModule } from './professor/professor.module';
import { FacilityService } from './facility/facility.service';
import { FacilityController } from './facility/facility.controller';
import { FacilityModule } from './facility/facility.module';

@Module({
  imports: [ProfessorModule, FacilityModule],
  controllers: [AppController, ProfessorController, FacilityController],
  providers: [AppService, ProfessorService, FacilityService],
})
export class AppModule {}
