import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity("subjects")
export class Subject {
  @PrimaryColumn({ type: 'int' , name: 'subject_id', unique: true })
  subjectId: number;
  @Column({type: 'varchar', length: 30, nullable: false})
  name: string;
}
