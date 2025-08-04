import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Shift } from './shift.entity';
import { PassengerCounter } from './passenger-counter.entity';

@Entity('itinerary')
export class Itinerary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  route: string;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column()
  itinerary: string;

  @Column()
  km_traveled: string;

  @Column()
  shift_id: number;

  @ManyToOne(() => Shift, (shift) => shift.itineraries)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  @OneToMany(() => PassengerCounter, (counter) => counter.intenary_id)
  counter: PassengerCounter[];

  // 👉 fecha desde la cual esta versión aplica
  @Column({ type: 'date' })
  effective_date: Date;

  // 👉 indica si esta es la versión activa
  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
