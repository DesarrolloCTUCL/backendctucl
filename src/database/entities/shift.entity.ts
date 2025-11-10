import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Itinerary } from './itinerary.entity';

@Entity('shift')
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shiftcode: string;

  @Column()
  route: string;

  @Column()
  chainpc: string;

  @Column()
  times: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Itinerary, (itinerary) => itinerary.shift)
  itineraries: Itinerary[];
}