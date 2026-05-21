import { Module } from '@nestjs/common';
import { GraphService } from './graph.service';
import { GraphController } from './graph.controller';
import { PrismaModule } from 'prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  providers: [GraphService],
  controllers: [GraphController]
})
export class GraphModule {}
