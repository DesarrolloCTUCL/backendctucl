import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Shift } from './shift.entity';

@Entity('itinerary')
export class Itinerary {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty({ description: 'ID autoincremental del itinerario', example: 1 })
  id: number;

  @Column({ unique: true })
  @IsString()
  @ApiProperty({ description: 'Código único del itinerario (ej: it-1234)', example: 'it-1234' })
  code: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'ID de la ruta asociada', example: 'route-456' })
  route: string;

  @Column({ type: 'time' })
  @IsString()
  @ApiProperty({ description: 'Hora de inicio (formato HH:mm:ss)', example: '08:00:00' })
  start_time: string;

  @Column({ type: 'time' })
  @IsString()
  @ApiProperty({ description: 'Hora de fin (formato HH:mm:ss)', example: '10:30:00' })
  end_time: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Nombre del itinerario', example: 'Ruta Norte 1' })
  itinerary: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Kilómetros recorridos', example: '12.5' })
  km_traveled: string;

  @ManyToOne(() => Shift, (shift) => shift.itineraries)
  @JoinColumn({ name: 'shift' })
  shift: Shift;

  @CreateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de creación del registro' })
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de última actualización' })
  updated_at: Date;
}
