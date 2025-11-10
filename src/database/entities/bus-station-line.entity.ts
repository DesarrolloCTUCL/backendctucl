import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BusLine } from './bus-line.entity';
import { BusStation } from './bus-station.entity';

@Entity('bus_line_stations')
export class BusLineStations {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BusLine, (line) => line.stationsRelation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bus_line_id' })
  busLine: BusLine;

  @ManyToOne(() => BusStation, (station) => station.linesRelation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bus_station_id' })
  busStation: BusStation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  status: boolean;
}