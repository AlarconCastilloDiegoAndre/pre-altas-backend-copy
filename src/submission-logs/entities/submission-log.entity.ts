import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Student } from '../../students/entities/student.entity';
import { Admin } from '../../admins/entities/admin.entity';

export enum SubmissionAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  CONFIRM = 'confirm',
  BLOCK = 'block',
}

@Entity('submission_logs')
export class SubmissionLog {
  @PrimaryGeneratedColumn('uuid', { name: 'log_id' })
  logId!: string;

  // Admin que ejecuta la acción
  @Index('idx_logs_actor_admin_id')
  @Column({ name: 'actor_admin_id', type: 'uuid' })
  actorAdminId!: string;

  // Alumno afectado (puede no aplicar en algunos eventos)
  @Index('idx_logs_student_id')
  @Column({ name: 'student_id', type: 'int', nullable: true })
  studentId!: number | null;

  // Entidad afectada (para este caso, ENROLLMENTS)
  @Column({ name: 'entity', type: 'varchar', length: 32, default: 'ENROLLMENTS' })
  entity!: string;

  // ID del registro afectado (enrollments.enrollment_id es BIGINT → string en TS)
  @Index('idx_logs_entity_id')
  @Column({ name: 'entity_id', type: 'bigint' })
  entityId!: string;

  @Column({ name: 'action', type: 'enum', enum: SubmissionAction })
  action!: SubmissionAction;

  // Motivo del cambio (obligatorio en ediciones admin a nivel de negocio; aquí opcional)
  @Column({ name: 'reason', type: 'text', nullable: true })
  reason!: string | null;

  @Column({ name: 'changes_json', type: 'jsonb', nullable: true })
  changesJson!: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'ts', type: 'timestamp with time zone' })
  ts!: Date;

  // -------- Relaciones --------
  @ManyToOne(() => Admin, undefined, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'actor_admin_id', referencedColumnName: 'adminId' })
  actorAdmin!: Admin;

  @ManyToOne(() => Student, undefined, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'student_id', referencedColumnName: 'studentId' })
  student!: Student | null;

  @ManyToOne(() => Enrollment, undefined, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'entity_id', referencedColumnName: 'enrollmentId' })
  enrollment!: Enrollment;
}
