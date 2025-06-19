import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { MqttCommandHistory } from './mqtt-command-history.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { Vehicle } from './vehicle.entity';

export enum AccountType {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  DRIVER = 'DRIVER',
  PARTNER = 'PARTNER',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único del usuario' })
  id: number;

  @Column({ unique: true })
  @IsString()
  @ApiProperty({ description: 'Nombre de usuario único', example: 'jdoe' })
  username: string;

  @Column({ unique: true })
  @IsEmail()
  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'jdoe@example.com' })
  email: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Teléfono del usuario', example: '+593987654321', required: false })
  phone?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Cedula del Usuario', example: '1123585671', required: false })
  dni?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Dirección del usuario', example: 'Av. 10 de Agosto y Colón', required: false })
  address?: string;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  @IsEnum(AccountType)
  @ApiProperty({ description: 'Tipo de cuenta del usuario', enum: AccountType, example: AccountType.STAFF })
  account_type: AccountType;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  name: string;

  @Column()
  @IsString()
  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez' })
  lastname: string;

  @ManyToOne(() => Company, (company) => company.users, { nullable: true, eager: true })
  @JoinColumn({ name: 'company_id' })
  @ApiProperty({ description: 'Compañía a la que pertenece el usuario', type: () => Company, required: false })
  company?: Company;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user, { eager: true })
  @ApiProperty({
    description: 'Lista de vehículos que pertenecen al usuario',
    type: () => [Vehicle],
    required: false,
  })
  vehicles?: Vehicle[];

  @Column()
  @IsDate()
  @ApiProperty({ description: 'Fecha de nacimiento del usuario', example: '1990-05-15' })
  birthday: Date;

  @CreateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de creación del usuario', example: '2025-06-13T10:00:00Z' })
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  @ApiProperty({ description: 'Fecha de última actualización del usuario', example: '2025-06-13T12:00:00Z' })
  updated_at: Date;

  @Column({ default: true })
  @IsBoolean()
  @ApiProperty({ description: 'Estado del usuario (activo/inactivo)', example: true })
  status: boolean;

  @OneToMany(() => MqttCommandHistory, (command) => command.user)
  @ApiProperty({ description: 'Comandos MQTT asociados al usuario', type: () => [MqttCommandHistory] })
  mqttCommands: MqttCommandHistory[];
}
