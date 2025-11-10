import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Itinerary } from './itinerary.entity';

@Entity()
export class PassengerCounter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.counter, { eager: true })
  @JoinColumn({ name: 'bus_id' })
  bus: Vehicle;

  @ManyToOne(() => Itinerary, (itinerary) => itinerary.counter, { nullable: true, eager: true })
  @JoinColumn({ name: 'itinerary_id' })
  itinerary: Itinerary;

  @Column({ default: false })
  special: boolean;
}
