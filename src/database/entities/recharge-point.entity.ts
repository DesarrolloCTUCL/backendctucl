import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsDate
} from 'class-validator';
import { Device } from './device.entity';

@Entity('recharge_point')
export class Recharge_point {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único del punto de carga' })
  id: number;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Razón social del punto de carga', example: 'ElectroCargas S.A.' })
  business_name: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Nombre del responsable', example: 'Carlos' })
  name: string;


  @Column()
  @IsString()
  @ApiProperty({ description: 'RUC del punto de carga', example: '0991234567001' })
  ruc: string;


  @Column()
  @IsString()
  @ApiProperty({ description: 'Teléfono de contacto', example: '+593987654321' })
  phone: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsEmail()
  @ApiProperty({ description: 'Correo electrónico', example: 'carlos.gomez@empresa.com', required: false })
  email?: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Dirección física del punto de carga', example: 'Av. Amazonas y Naciones Unidas' })
  address: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Usuario del dispositivo asociado', example: 'device_001', required:false })
  device_username?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Contraseña del dispositivo asociado', example: 'securepass123', required:false })
  device_password?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'ID del dispositivo (futura relación)', example: 'device-id-abc', required: false })
  device_id?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Contrato asociado (futura relación)', example: 'contract-2025-001', required: false })
  contract?: string;

  @Column('float')
  @IsNumber()
  @ApiProperty({ description: 'Latitud geográfica', example: -0.22985 })
  lat: number;

  @Column('float')
  @IsNumber()
  @ApiProperty({ description: 'Longitud geográfica', example: -78.52495 })
  long: number;


  @Column({ default: true })
  @IsBoolean()
  @ApiProperty({ description: 'Estado del punto (activo/inactivo)', example: true })
  status: boolean;

  @CreateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de creación del registro', example: '2025-06-13T10:00:00Z' })
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de última actualización', example: '2025-06-13T12:00:00Z' })
  updated_at: Date;


}
