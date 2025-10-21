import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Career } from '../../careers/entities/career.entity';
import { Subject } from '../../subjects/entities/subject.entity';

@Entity('career_subject')
export class CareerSubject {
  @PrimaryGeneratedColumn("increment")
  career_subject_id: number;

  @ManyToOne(() => Career, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'career_id' })
  career: Career;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column({ type: 'smallint' })
  semester: number;
}