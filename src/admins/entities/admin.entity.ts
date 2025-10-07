import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn("uuid",{ name: 'admin_id'})
  adminId: string;
  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;
  @Column({name:'username', type: 'varchar', length: 100, unique: true})
  username: string;
  @Column({ name: 'password', type: 'varchar', length: 200 })
  password: string;
  @Column({ name: 'assigned_department', type: 'varchar', length: 50 })
  assignedDepartment: string;
}
