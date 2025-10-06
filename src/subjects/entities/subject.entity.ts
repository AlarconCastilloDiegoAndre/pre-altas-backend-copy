import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('subjects')
export class Subject {
  @PrimaryColumn({
    type: 'int',
    name: 'subject_id',
    nullable: false,
    unique: true,
  })
  subjectId: number;
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;
}
