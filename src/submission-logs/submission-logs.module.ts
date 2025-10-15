// src/submission-logs/submission-logs.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionLog } from './entities/submission-log.entity';
import { SubmissionLogsService } from './submission-logs.service';
import { SubmissionLogsController } from './submission-logs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubmissionLog])],
  providers: [SubmissionLogsService],
  controllers: [SubmissionLogsController],
  exports: [TypeOrmModule, SubmissionLogsService],
})
export class SubmissionLogsModule {}
