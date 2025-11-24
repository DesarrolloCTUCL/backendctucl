import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsString, IsNumber, IsDate, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {Vehicle} from './vehicle.entity';
import { Itinerary } from './itinerary.entity';
import { BusLine } from './bus-line.entity';
import { User } from './user.entity';

@Entity('schedule')
export class Schedule{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=>Vehicle,{eager:true})
  @JoinColumn({name:'vehicle_id'})
  vehicle: Vehicle;

  @Column()
  date: Date;

  @Column()
  itinerary: string;
  
  @ManyToOne(()=>BusLine,{eager:true})
  @JoinColumn({name:'BusLine_id'})
  busline: BusLine;

  @ManyToOne(()=>User,{eager:true})
  @JoinColumn({name:'User_id'})
  user: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'driver_id' })
  driver: User;

  @Column()
  observations: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
