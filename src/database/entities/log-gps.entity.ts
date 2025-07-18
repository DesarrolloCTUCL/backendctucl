import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BusStation } from './bus-station.entity';
import { Shift } from './shift.entity';

@Entity('log_gps')
export class Log_gps {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID de Registro', example: 1 })
  id: number;

  @Column()
  @ApiProperty({ description: 'ID del Bus', example: 1539 })
  vehicle_id: string;

  @Column({ type: 'timestamp' })
  @ApiProperty({ description: 'Fecha y hora del registro (timestamp)', example: '2025-12-25T14:20:00Z' })
  datetime: Date;

  @ManyToOne(() => BusStation, { eager: true }) // eager si quieres que siempre cargue el objeto
  @JoinColumn({ name: 'control_point_id' })
  @ApiProperty({ description: 'ID del punto de control asociado', example: 7 })
  cpoint_id: BusStation;

  @Column()
  @ApiProperty({ description: 'Nombre punto de control', example: 'Parque Bolivar' })
  cpoint: string;
  
  @Column({ nullable: true })
  control_point_id?: number;


  @ManyToOne(() => Shift, { eager: true, nullable: true }) // eager para que cargue automáticamente, nullable si no siempre tiene turno
  @JoinColumn({ name: 'shift_id' }) // define la columna FK
  @ApiProperty({ description: 'Turno asociado', type: () => Shift, example: { id: 1, shiftcode: 'L10A' } })
  shift?: Shift;

  @Column({ nullable: true })
  shift_id?: number;

  @Column('double precision')
  @ApiProperty({ description: 'Latitud geográfica del punto', example: -2.170998 })
  lat: number;

  @Column('double precision')
  @ApiProperty({ description: 'Longitud geográfica del punto', example: -79.922356 })
  long: number;

  @Column()
  @ApiProperty({ description: 'Velocidad vehículo', example: '40 Km/h' })
  speed: string;


  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
