import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { BusLineStations } from './bus-station-line.entity';

@Entity('bus_lines')
export class BusLine {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID úniaco de la línea de bus' })
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Número identificador de la línea', example: 1 })
  number: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre de la línea de bus', example: 'L-2' })
  name: string;

  
  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Breve Descripcion de la Linea', example: 'la linea va de sauces norte hasta la argelia' })
  description: string;

  @CreateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de creación del registro', example: '2025-06-13T10:00:00Z' })
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de última actualización', example: '2025-06-13T12:00:00Z' })
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  @ApiProperty({ description: 'Indica si la linea está activa o eliminada', example: true })
  status: boolean;

  @OneToMany(() => BusLineStations, (busLineStation) => busLineStation.busLine)
  stationsRelation: BusLineStations[];
}
