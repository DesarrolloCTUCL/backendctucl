import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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

  // Campo numérico que almacena el id de Shift (clave foránea)
  @Column()
  shift_id: number;

  // Relación formal para acceder a datos de Shift
  @ManyToOne(() => Shift, (shift) => shift.itineraries)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  @OneToMany(() => PassengerCounter, (counter) => counter.intenary_id)
  counter: PassengerCounter[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
