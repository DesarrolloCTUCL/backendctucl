import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn } from 'typeorm';
import { IsString, IsNumber, IsDate, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('schedule')
export class Schedule{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bus_id: string;

  @Column()
  date: string;

  @Column()
  itinerary: string;

  @Column() // plantear relacion con entidad de bus line en un futuro
  line_id: string;
  

  @Column()
  driver: string;

  @Column()//plantear relacion con entidad de usuario en un futuro
  dispatcher: string;

  @Column()
  observations: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
