import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';

import { ProfessorModule } from './professor/professor.module';
import { FacilityModule } from './facility/facility.module';

import { MailModule } from './mail/mail.module';
import { GraphModule } from './mail/graph/graph.module';

@Module({
  imports: [
    /*
     * ENV
     */
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    /*
     * Scheduler
     */
    ScheduleModule.forRoot(),

    /*
     * Database
     */
    PrismaModule,

    /*
     * Feature Modules
     */
    ProfessorModule,
    FacilityModule,
    MailModule,
    GraphModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
