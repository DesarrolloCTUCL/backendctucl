import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn } from 'typeorm';
import { IsString, IsNumber, IsDate, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('log_gps')
export class Log_gps{
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID de Registro', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: 'ID del Bus', example: 1539 })
  vehicle_id: string;

  @Column()
  @ApiProperty({ description: 'Fecha de Registro punto deControl', example: "25/12/2025" })
  date: string;

  @Column()
  @ApiProperty({ description: 'Hora de Registro punto deControl', example: "14:20:00" })
  time: string;

  @Column() 
  @ApiProperty({ description: 'Nombre punto deControl', example: "Parque central" })
  control_point: string;
  
  @Column('double precision')
  @ApiProperty({ description: 'Latitud geográfica del punto', example: -2.170998 })
  lat: number;

  @Column('double precision')
  @ApiProperty({ description: 'Longitud geográfica del punto', example: -79.922356})
  long: number;

  @Column()
  @ApiProperty({ description: 'Velocidad vehiculo', example: "40 Km/h" })
  speed: string;

  @Column()
  @ApiProperty({ description: 'Itinerario del Bus', example: "HA156" })
  itinerary: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
