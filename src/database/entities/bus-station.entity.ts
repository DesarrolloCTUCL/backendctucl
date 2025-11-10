import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { BusLineStations } from './bus-station-line.entity';

export enum BusStopType {
  CONTROL_POINT = 'CONTROL_POINT',
  BUS_STOP = 'BUS_STOP',
  TRACK_POINT = 'TRACK_POINT',
  AUTOMATED_STOP = 'AUTOMATED_STOP',
}

@Entity('bus_stations')
export class BusStation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('double precision')
  lat: number;

  @Column('double precision')
  long: number;

  @Column()
  route: string;

  @Column('float')
  radius: number;

  @Column({
    type: 'enum',
    enum: BusStopType,
    default: BusStopType.BUS_STOP,
  })
  type: BusStopType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(() => BusLineStations, (busLineStation) => busLineStation.busStation)
  linesRelation: BusLineStations[];
}