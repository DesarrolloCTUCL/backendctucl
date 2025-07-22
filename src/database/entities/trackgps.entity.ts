// src/modules/gps/trackgps.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('trackgps')
export class TrackGps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  device_id: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column('float')
  lat: number;

  @Column('float')
  lng: number;

  @Column('float', { nullable: true })
  speed: number;

  @CreateDateColumn()
  created_at: Date;
}
