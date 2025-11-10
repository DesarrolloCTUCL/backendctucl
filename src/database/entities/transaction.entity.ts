import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Device } from './device.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  card_code: string;

  @Column({ type: 'text', nullable: false })
  card_type: string;

  @Column({ type: 'text', nullable: false })
  card_date: string;

  @Column({ type: 'text', nullable: false })
  card_time: string;

  @Column({ type: 'timestamp without time zone', nullable: false })
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  balance: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  timestamp: Date;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;

  @ManyToOne(() => Device, (device) => device.transactions)
  @JoinColumn({ name: 'device_id' })
  device: Device;
}