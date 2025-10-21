import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Career } from '../careers/entities/career.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Career])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
