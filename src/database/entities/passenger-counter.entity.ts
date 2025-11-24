import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Itinerary } from './itinerary.entity';

@Entity()
export class PassengerCounter {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: 'varchar', length: 255, nullable: true })
  route: string;


  @Column({ type: 'int', unsigned: true })
  passengers: number;


  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;


  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;


  @ManyToOne(() => Vehicle, (vehicle) => vehicle.counter)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @ManyToOne(() => Itinerary, (itinerary) => itinerary.counter, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'itinerary_id' })
  itinerary: Itinerary;
}
