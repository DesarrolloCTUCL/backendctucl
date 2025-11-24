import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { BusLineStations } from './bus-station-line.entity';
import { Vehicle } from './vehicle.entity';

@Entity('bus_lines')
export class BusLine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @OneToMany(() => BusLineStations, (busLineStation) => busLineStation.busLine)
  stationsRelation: BusLineStations[];


  @OneToMany(() => Vehicle, (vehicle) => vehicle.line)
  vehicles: Vehicle[];
}