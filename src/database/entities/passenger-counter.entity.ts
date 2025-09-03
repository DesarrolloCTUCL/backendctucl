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
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Vehicle } from './vehicle.entity';
import { Itinerary } from './itinerary.entity';


@Entity('passenger_counter')
export class PassengerCounter {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único del reporte de conteo', example: 1 })
  id: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.counter)
  @JoinColumn({ name: 'bus_id' })
  @ApiProperty({ description: 'id del bus', example: 1 })
  bus_id: Vehicle;


  @ManyToOne(() => Itinerary, (itinerary) => itinerary.counter, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'itinerary_id' })
  @ApiPropertyOptional({ description: 'id del itinerario', example: 1, nullable: true })
  intenary_id?: Itinerary | null;


  @Column({ type: 'timestamp' })
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ description: 'Tiempo de registro del conteo', example: '2025-06-13T10:00:00Z' })
  timestamp: Date;


  @Column({ type: 'boolean' })
  @IsBoolean()
  @Type(() => Boolean) // 🔥 Añadir esto es buena práctica para transformar correctamente
  @ApiProperty({ description: 'conteo especial o no', example: false })
  special: boolean;


}
