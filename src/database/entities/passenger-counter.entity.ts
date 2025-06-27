import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import {
  IsInt,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from './vehicle.entity';
import { Itinerary } from './itinerary.entity';


@Entity('passenger_counter')
export class PassengerCounter {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único del reporte de conteo', example: 1 })
  id: number;

  @Column()
  @IsInt()
  @ApiProperty({ description: 'Número total de pasajeros contados', example: 300 })
  passengers: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.counter)
  @JoinColumn({ name: 'bus_id' })
  @ApiProperty({ description: 'id del bus', example: 1 })
  bus_id: Vehicle;


  @ManyToOne(() => Itinerary, (itinerary) => itinerary.counter)
  @JoinColumn({ name: 'itinerary_id' })
  @ApiProperty({ description: 'id del intinerario', example: 1 })
  intenary_id: Itinerary;
  
  @Column({ type: 'timestamp' })
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ description: 'Tiempo de inicio del conteo', example: '2025-06-13T10:00:00Z' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ description: 'Tiempo de finalización del conteo', example: '2025-06-13T10:30:00Z' })
  end_time: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ description: 'Fecha de creación del registro', example: '2025-06-13T10:35:00Z' })
  created_at: Date;
}
