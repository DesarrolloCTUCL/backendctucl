import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNumber,
    IsEnum,
    IsDate,
} from 'class-validator';
import { BusLineStations } from './bus-station-line.entity';

export enum BusStopType {
    CONTROL_POINT = 'CONTROL_POINT',
    BUS_STOP = 'BUS_STOP',
    TRACK_POINT = 'TRACK_POINT',
    AUTOMATED_STOP = 'AUTOMATED_STOP',
}

@Entity('bus_stations')
export class BusStation {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'ID único del punto de parada' })
    id: number;

    @Column()
    @IsString()
    @ApiProperty({ description: 'Nombre del punto de parada', example: 'Sauces Norte' })
    name: string;


    @Column('double precision')
    @ApiProperty({ description: 'Latitud geográfica del punto', example: -2.170998 })
    lat: number;

    @Column('double precision')
    @ApiProperty({ description: 'Longitud geográfica del punto', example: -79.922356})
    long: number;

    @Column()
    @IsString()
    @ApiProperty({ description: 'Dirección física del punto', example: 'Av. Principal y Calle 5' })
    address: string;

    @Column()
    @IsString()
    @ApiProperty({
        description: 'Ruta relacionada (en el futuro puede convertirse en relación o JSON)',
        example: 'Ruta Norte-Sur',
    })
    route: string;

    @Column('float')
    @IsNumber()
    @ApiProperty({ description: 'Radio de alcance del punto en metros', example: 30 })
    radius: number;

    @Column({
        type: 'enum',
        enum: BusStopType,
        default: BusStopType.BUS_STOP,
    })
    @IsEnum(BusStopType)
    @ApiProperty({ description: 'Tipo , si es parada o punto de control', enum: BusStopType, example: BusStopType.BUS_STOP })
    type: BusStopType;

    

    @CreateDateColumn()
    @IsDate()
    @ApiProperty({ description: 'Fecha de creación del registro', example: '2025-06-13T10:00:00Z' })
    created_at: Date;



    @UpdateDateColumn()
    @IsDate()
    @ApiProperty({ description: 'Fecha de última actualización del registro', example: '2025-06-13T12:00:00Z' })
    updated_at: Date;

    @Column({ type: 'boolean', default: true })
    @ApiProperty({ description: 'Estado del punto de parada (activo/inactivo)', example: true })
    status: boolean;

    @OneToMany(() => BusLineStations, (busLineStation) => busLineStation.busStation)
    linesRelation: BusLineStations[];
}
