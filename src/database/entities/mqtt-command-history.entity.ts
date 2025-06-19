import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('mqtt_command_history')
export class MqttCommandHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  command: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @ManyToOne(() => User, (user) => user.mqttCommands)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @Column()
  path: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  topic: string;
}
