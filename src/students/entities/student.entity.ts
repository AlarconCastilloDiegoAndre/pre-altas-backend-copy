import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Career } from '../../careers/entities/career.entity';

@Entity('students')
export class Student {
  @PrimaryColumn({
    type: 'int',
    name: 'student_id',
    nullable: false,
    unique: true,
  })
  studentId: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  password: string;

  @Column({ type: 'smallint', name: 'group_no', nullable: false })
  groupNo: number;

  @Column({ type: 'smallint', nullable: false })
  semester: number;

  @ManyToOne(() => Career)
  @JoinColumn({ name: 'career_id', referencedColumnName: 'careerId' })
  career: Career;
}
