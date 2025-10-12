import { Module } from '@nestjs/common';
import { CareerSubjectsService } from './career-subjects.service';
import { CareerSubjectsController } from './career-subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerSubject } from './entity/career-subject.entity';
import { Career } from '../careers/entities/career.entity';
import { Subject } from '../subjects/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CareerSubject, Career, Subject])],
  controllers: [CareerSubjectsController],
  providers: [CareerSubjectsService],
})
export class CareerSubjectsModule {}
