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
import { Vehicle } from './vehicle.entity';
import { AccountType } from 'src/common/enum/account-type.enum';
import { Gender } from 'src/common/enum/gender.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ unique: true })
  dni: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 100, select: false })
	password: string;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  role: AccountType;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  birthdate: Date;

  @CreateDateColumn({
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false,
	})
	created_at: Date;

	@UpdateDateColumn({
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false,
	})
	updated_at: Date;

  @Column({ type: 'enum',enum:Gender,default:Gender.MALE })
	gender: Gender;

  @Column({ type: 'varchar', length: 255, nullable: true })
	profile: string;

  @Column({ type: 'json', nullable: true })
  shared_vehicles: { id: number; register: number }[] | null;

  @Column({ default: true })
  status: boolean;

  //relaciones

  @ManyToOne(() => Company, (company) => company.users, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles?: Vehicle[];
}
