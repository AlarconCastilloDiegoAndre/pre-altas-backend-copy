import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('periods')
export class Period {
  @PrimaryColumn({ name: 'period_id', type: 'varchar', length: 20 })
  periodId: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ name: 'active', type: 'boolean', default: false})
  active: boolean;
}
