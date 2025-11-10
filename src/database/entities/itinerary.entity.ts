import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Shift } from './shift.entity';
import { PassengerCounter } from './passenger-counter.entity';
import { ControlStrip } from './control-strip.entity'; // Importa control-strip

@Index(
  'uq_itinerary_code_active',
  ['itinerary', 'code'],
  { unique: true, where: `"is_active" = true` }
)

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

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  km_traveled: number;
  

  @Column()
  shift_id: number;

  @ManyToOne(() => Shift, (shift) => shift.itineraries)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  @OneToMany(() => PassengerCounter, (counter) => counter.itinerary)
  counter: PassengerCounter[];

  // Relación con ControlStrip
  @Column({ nullable: true })
  control_strip_id: number | null;

  @ManyToOne(() => ControlStrip)
  @JoinColumn({ name: 'control_strip_id' })
  control_strip: ControlStrip;

  @Column({ type: 'date' })
  effective_date: Date;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
