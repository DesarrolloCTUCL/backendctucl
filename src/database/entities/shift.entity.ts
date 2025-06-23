import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn,ManyToOne,JoinColumn ,OneToMany} from 'typeorm';
import { IsString, IsNumber, IsDate, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Itinerary } from './itinerary.entity';


@Entity('shift')
export class Shift {
  @PrimaryColumn()
  @IsString()
  @ApiProperty({ description: 'ID único del turno', example: 'L10A' })
  id: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'nombre de la ruta', example: 'sauces-julio ordoñez' })
  route: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Cadena punto de control', example: '71, 44, 72, 73, 74, 75, 88, 76, 77, 78, 79, 52, 80, 81' })
  chainpc: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Tiempos entre puntos de control', example: '0,2,4,4,4,6,4,4,3,5,7,4,5,1' })
  times: string;


  @CreateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de creación del registro', example: '2025-06-13T10:00:00Z' })
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de última actualización', example: '2025-06-13T12:00:00Z' })
  updated_at: Date;

  @OneToMany(() => Itinerary, (itinerary) => itinerary.shift)
  itineraries: Itinerary[];
}