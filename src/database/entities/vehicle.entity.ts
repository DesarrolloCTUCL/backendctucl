import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Company } from './company.entity';
import { PassengerCounter } from './passenger-counter.entity';
import { BusLine } from './bus-line.entity';

export enum OperationStatus {
  INACTIVE = 'inactivo',
  ON_ROUTE = 'en_ruta',
  WAITING = 'reten',
}

export enum Grupo {
  GRUPO_1 = 'grupo_1',
  GRUPO_2 = 'grupo_2',
}

export enum CompanyEnum {
  mayo24 = '24mayo',
  cuxibamba = 'cuxibamba',
  urbasur = 'urbasur',
  urbaexpress = 'urbaexpress',
}

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  register: number;

  @Column({ nullable: true })
  plate?: string;

  @Column({
    type: 'enum',
    enum: OperationStatus,
    default: OperationStatus.INACTIVE,
  })
  operation_status: OperationStatus;

  @Column({
    type: 'enum',
    enum: Grupo,
  })
  grupo: Grupo;

  @Column({ type: 'boolean', default: true })
  status: boolean;



  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number;
  
  
  //relaciones
  
  @ManyToOne(() => User, (user) => user.vehicles, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => Company, (company) => company.vehicles, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @ManyToOne(() => BusLine, (line) => line.vehicles, { nullable: true })
  @JoinColumn({ name: 'line_id' })
  line?: BusLine;
  
  @OneToMany(() => PassengerCounter, (counter) => counter.vehicle)
  counter: PassengerCounter[];
}
