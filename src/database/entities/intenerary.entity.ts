import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,ManyToOne,JoinColumn } from 'typeorm';
import { IsString, IsNumber, IsDate, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BusLine } from './bus-line.entity';

@Entity('intinerary')
export class Intinerary {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identificador único del itinerario' })
  id: number;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Código del itinerario', example: '100L1' })
  code: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Nombre del itinerario', example: 'Ruta Norte' })
  name: string;

  @Column('float')
  @IsNumber()
  @ApiProperty({ description: 'Kilómetros del itinerario', example: 12.5 })
  kilometers: number;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Turno del itinerario', example: 'L1B' })
  shift: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'ID de la línea de bus asociada (será una relación en el futuro)', example: 'L2' })
  line_id: string;

  // @ManyToOne(() => BusLine, (busline) => busline.vehicles)
  // @JoinColumn({ name: 'line_id' })
  // line_id: BusLine;


  @Column()
  @IsString()
  @ApiProperty({ description: 'ID de la ruta asociada (será una relación en el futuro)', example: 'route-456' })
  route_id: string;

  @Column({ type: 'time' })
  @IsString()
  @ApiProperty({ description: 'Hora de inicio (formato HH:mm:ss)', example: '08:00:00' })
  start_time: string;

  @Column({ type: 'time' })
  @IsString()
  @ApiProperty({ description: 'Hora de fin (formato HH:mm:ss)', example: '10:30:00' })
  end_time: string;

  @CreateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de creación del registro', example: '2025-06-13T10:00:00Z' })
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de última actualización', example: '2025-06-13T12:00:00Z' })
  updated_at: Date;
}
