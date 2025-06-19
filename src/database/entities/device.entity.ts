import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import {
  IsString,
  IsEnum,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ChargingPoint } from './charging-point.entity';

export enum DeviceType {
  MOBILE_POS = 'MOBILE_POS',
  E60_POS = 'X60_POS', //VALIDADOR MORADO  
  X600_POS = 'X600_POS',  //VALIDADOR AMARILLO    
}

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único del dispositivo', example: 1 })
  id: number;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Nombre o alias del dispositivo', example: 'Dispositivo 01 - Ruta Norte' })
  name: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Número de serie del dispositivo', example: 'SN123456789' })
  serial: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'IMEI del dispositivo', example: '356938035643809' })
  imei: string;
  @Column({
    type: 'enum',
    enum: DeviceType,
  })
  @IsEnum(DeviceType)
  @ApiProperty({ description: 'Tipo de dispositivo', enum: DeviceType, example: DeviceType.MOBILE_POS })
  type: DeviceType;

  @Column({ default: true })
  @IsBoolean()
  @ApiProperty({ description: 'Estado del dispositivo (activo/inactivo)', example: true })
  status: boolean;

  @UpdateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de última actualización', example: '2025-06-13T12:00:00Z' })
  updated_at: Date;

  @CreateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de creación del registro', example: '2025-06-13T10:00:00Z' })
  created_at: Date;

  @ManyToOne(() => ChargingPoint, (chargin_point) => chargin_point.devices)
  @JoinColumn({ name: 'charging_point_id' })
  charging_point: ChargingPoint;
  }
