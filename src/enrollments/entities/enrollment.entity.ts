import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Period } from '../../periods/entities/period.entity';
import { Student } from '../../students/entities/student.entity';
import { CareerSubject } from '../../career-subjects/entity/career-subject.entity';

export enum EnrollmentState {
  BORRADOR = 'BORRADOR',
  CONFIRMADA = 'CONFIRMADA',
  BLOQUEADA = 'BLOQUEADA',
}

@Entity('enrollments')
@Unique('uq_student_subject_period', ['studentId', 'careerSubjectId', 'periodId'])
export class Enrollment {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'enrollment_id' })
  enrollmentId!: string;

  @Index('idx_enrollments_student_id')
  @Column({ name: 'student_id', type: 'int' })
  studentId!: number;

  @Index('idx_enrollments_career_subject_id')
  @Column({ name: 'career_subject_id', type: 'int' })
  careerSubjectId!: number;

  @Index('idx_enrollments_period_id')
  @Column({ name: 'period_id', type: 'varchar', length: 20 })
  periodId!: string;

  @Column({ type: 'enum', enum: EnrollmentState, default: EnrollmentState.BORRADOR })
  state!: EnrollmentState;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt!: Date;

  // Relaciones
  @ManyToOne(() => Period, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'period_id', referencedColumnName: 'periodId' })
  period!: Period;

  @ManyToOne(() => Student, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'student_id', referencedColumnName: 'studentId' })
  student!: Student;

  @ManyToOne(() => CareerSubject, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'career_subject_id', referencedColumnName: 'career_subject_id' })
  careerSubject!: CareerSubject;
}
