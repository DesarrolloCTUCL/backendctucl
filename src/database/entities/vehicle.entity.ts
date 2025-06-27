import { Entity, PrimaryColumn, Column, ManyToOne,JoinColumn,PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsPhoneNumber, IsNumber, IsIn, IsBoolean, IsOptional } from 'class-validator';
import { User } from './user.entity';
export enum OperationStatus {
    INACTIVE = 'inactivo',
    ON_ROUTE = 'en_ruta',
    WAITING = 'reten',
}

export enum Grupo {
    GRUPO_1 = 'grupo_1',
    GRUPO_2 = 'grupo_2',
}

export enum Company {
    mayo24 = '24mayo',
    cuxibamba = 'cuxibamba',
    urbasur = 'urbasur',
    urbaexpress = 'urbaexpress',
}

@Entity('vehicles')
export class Vehicle {

    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'ID interno autoincremental del vehículo', example: 1 })
    id: number;
    
    @Column({ unique: true })
    @IsNumber()
    @ApiProperty({ description: 'Número de registro del bus (ej: 1500 - 1738)', example: 1523 })
    register: number;

   
    @Column()
    @IsString()
    @ApiProperty({ description: 'Nombre del socio (dueño) del bus', example: 'Juan Pérez' })
    partner: string;

    @ManyToOne(() => User, (user) => user.vehicles, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    @IsOptional()
    @ApiProperty({
    description: 'Usuario dueño del vehículo. Si no tiene, el vehículo pertenece a la empresa',
    type: () => User,
    required: false,
    })
    user?: User;
    
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'Cédula del socio', example: '0102030405', required: false })
    dni?: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsPhoneNumber('EC') // Cambia el código según el país
    @ApiProperty({ description: 'Número de teléfono del socio', example: '+593987654321', required: false })
    phone?: string;

 
    @Column({
        type: 'enum',
        enum: Company,
    })
    @IsEnum(Company)
    @ApiProperty({ description: 'Empresa a la que pertenece el bus', enum: Company })
    company: Company;


    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'Placa del bus', example: 'ABC-1234', required: false })
    plate?: string;

    @Column({
        type: 'enum',
        enum: OperationStatus,
        default: OperationStatus.INACTIVE,
    })
    @IsEnum(OperationStatus)
    @ApiProperty({ description: 'Estado operativo del bus', enum: OperationStatus })
    operation_status: OperationStatus;

    @Column({
        type: 'enum',
        enum: Grupo,
    })
    @IsEnum(Grupo)
    @ApiProperty({ description: 'Grupo al que pertenece el bus', enum: Grupo })
    grupo: Grupo;

    @Column({ type: 'boolean', default: true })
    @ApiProperty({ description: 'Indica si el bus está activo o eliminado', example: true })
    status: boolean;
}
