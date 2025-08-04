import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    VersionColumn,
  } from 'typeorm';
  export type ControlStripType = 'se sanciona' | 'se justifica' | 'no sancionable';

@Entity('control_strip')
export class ControlStrip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'time without time zone', name: 'start_time' })
  startTime: string;

  @Column({ type: 'time without time zone', name: 'end_time' })
  endTime: string;

  @Column({ type: 'text' })
  type: ControlStripType;

  @Column({ type: 'text', name: 'chain_strip' })
  chainStrip: string;

  @VersionColumn()
  version: number;
}