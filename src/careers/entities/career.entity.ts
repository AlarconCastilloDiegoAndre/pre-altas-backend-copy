import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('careers')
export class Career {
  @PrimaryColumn({
    name: 'career_id',
    type: 'varchar',
    length: 5,
    nullable: false,
  })
  careerId: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;
}
