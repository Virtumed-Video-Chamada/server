import { Module } from '@nestjs/common';
import { SchedulingService as SchedulingService } from './scheduling.service';
import { SchedulingController as SchedulingController } from './scheduling.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports:[PrismaModule],
  controllers: [SchedulingController],
  providers: [SchedulingService]
})
export class SchidulingModule {}
