import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BusStation } from './bus-station.entity';
import { Shift } from './shift.entity';

@Entity('log_gps')
export class Log_gps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicle_id: string;

  @Column({ type: 'timestamp' })
  datetime: Date;

  @ManyToOne(() => BusStation, { eager: true })
  @JoinColumn({ name: 'control_point_id' })
  cpoint_id: BusStation;

  @Column()
  cpoint: string;

  @Column({ nullable: true })
  control_point_id?: number;

  @ManyToOne(() => Shift, { eager: true, nullable: true })
  @JoinColumn({ name: 'shift_id' })
  shift?: Shift;

  @Column({ nullable: true })
  shift_id?: number;

  @Column('double precision')
  lat: number;

  @Column('double precision')
  long: number;

  @Column()
  speed: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}