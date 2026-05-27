import { Module } from '@nestjs/common';
import { ProfessorModule } from './professor/professor.module';
import { FacilityModule } from './facility/facility.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProfessorModule,
    FacilityModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
