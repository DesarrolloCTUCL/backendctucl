import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    VersionColumn,
  } from 'typeorm';
  
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
  
    @Column({ type: 'text', name: 'chain_strip' })
    chainStrip: string; // ej: "12,14,43"
  
    @VersionColumn()
    version: number;
  }
  