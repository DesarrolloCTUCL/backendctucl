import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('company')
export class Company {
  @ApiProperty({ example: 1, description: 'Id de la compania' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'TechCorp S.A.', description: 'Nombre de la compania' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({
    type: () => [User],
    description: 'Lista de usuarios asociados a la compania',
    required: false,
  })
  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @ApiProperty({
    type: () => [Vehicle],
    description: 'Lista de vehiculos asociados a la compania',
    required: false,
  })
  @OneToMany(() => Vehicle, (vehicle) => vehicle.company)
  vehicles: Vehicle[];
}
