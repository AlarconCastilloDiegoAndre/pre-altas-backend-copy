import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '../subjects/entities/subject.entity';
import { Career } from '../careers/entities/career.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Career])],
  controllers: [],
  providers: [SeedService],
})
export class SeedModule {}
