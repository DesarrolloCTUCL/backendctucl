import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index, // ✅ importar Index
} from 'typeorm';
import { Shift } from './shift.entity';
import { PassengerCounter } from './passenger-counter.entity';

// ✅ Esto aplica un índice único a code solo cuando is_active es true
@Index('uq_code_active', ['code'], { unique: true, where: `"is_active" = true` })
@Entity('itinerary')
export class Itinerary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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

  @Column({ type: 'date' })
  effective_date: Date;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
