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
	id: number;
	
	@Column({ unique: true })
	email: string;

	@Column({ nullable: true })
	phone?: string;

	@Column({ nullable: true })
	dni?: string;

	@Column({ nullable: true })
	address?: string;

	@Column({
		type: 'enum',
		enum: AccountType,
	})
	account_type: AccountType;

	@Column()
	name: string;

	@Column()
	lastname: string;

	@ManyToOne(() => Company, (company) => company.users, { nullable: true, eager: true })
	@JoinColumn({ name: 'company_id' })
	company?: Company;

	@OneToMany(() => Vehicle, (vehicle) => vehicle.user, { eager: true })
	vehicles?: Vehicle[];

	@Column()
	birthday: Date;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column({ default: true })
	status: boolean;

	@OneToMany(() => MqttCommandHistory, (command) => command.user)
	mqttCommands: MqttCommandHistory[];
}
