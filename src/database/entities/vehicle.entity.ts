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

  @Column()
  partner: string;

  @ManyToOne(() => User, (user) => user.vehicles, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;


  @Column({
      type: 'enum',
      enum: CompanyEnum,
  })
  company: CompanyEnum;

  @ManyToOne(() => Company, (company) => company.vehicles, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company_id?: Company;

  @Column({ nullable: true })
  dni?: string;

  @Column({ nullable: true })
  phone?: string;

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

  @OneToMany(() => PassengerCounter, (counter) => counter.bus)
  counter: PassengerCounter[];
}
