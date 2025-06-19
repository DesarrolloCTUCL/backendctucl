import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn } from 'typeorm';
@Entity('schedule')
export class Schedule{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicle_id: string;

  @Column()
  date: string;

  @Column()
  itinerary: string;

  @Column() // plantear relacion con entidad de bus line en un futuro
  line_id: string;
  
  @Column()//plantear relacion con entidad de usuario en un futuro
  user_id: string;

  @Column()
  driver: string;

  @Column()
  observations: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
