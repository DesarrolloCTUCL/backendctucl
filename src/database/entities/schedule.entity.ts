import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,ManyToOne,JoinColumn } from 'typeorm';
import { IsString, IsNumber, IsDate, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {Vehicle} from './vehicle.entity';


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

  @Column() // plantear relacion con entidad de bus line en un futuro
  line_id: number;
  
  @Column()//plantear relacion con entidad de usuario en un futuro
  user_id: number;

  @Column()
  driver: number;

  @Column()
  observations: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}