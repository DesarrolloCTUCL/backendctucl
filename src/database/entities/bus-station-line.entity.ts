//aqui estara la relacion muchos a muchos con las lineas de bus con respecto a las estaciones de bus



import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,ManyToOne,JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BusLine } from './bus-line.entity';
import { BusStation } from './bus-station.entity';
import {IsDate } from 'class-validator';

@Entity('bus_line_stations')
export class BusLineStations {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID de la relacion muchos a muchos' })
  id: number;

  @ManyToOne(() => BusLine, (line) => line.stationsRelation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bus_line_id' })
  @ApiProperty({ description: 'Línea de bus asociada' })
  busLine: BusLine;

  @ManyToOne(() => BusStation, (station) => station.linesRelation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bus_station_id' })
  @ApiProperty({ description: 'Estación de bus asociada' })
  busStation: BusStation;


  @CreateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de creación del registro', example: '2025-06-13T10:00:00Z' })
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de última actualización', example: '2025-06-13T12:00:00Z' })
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  @ApiProperty({ description: 'Indica si el bus está activo o eliminado', example: true })
  status: boolean;
}
