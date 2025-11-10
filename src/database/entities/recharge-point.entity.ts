import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Device } from './device.entity';

@Entity('recharge_point')
export class Recharge_point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  business_name: string;

  @Column()
  name: string;

  @Column()
  ruc: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  device_username?: string;

  @Column({ nullable: true })
  device_password?: string;

  @Column({ nullable: true })
  device_id?: string;

  @Column({ nullable: true })
  contract?: string;

  @Column('float')
  lat: number;

  @Column('float')
  long: number;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}