import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/database/entities/vehicle.entity';
import { User } from 'src/database/entities/user.entity';
import { Company } from 'src/database/entities/company.entity';

@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
         @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) { }
        async create(createVehicle: CreateVehicleDto) {
        const company = await this.companyRepository.findOne({
            where: { id: createVehicle.company_id },
        });

        if (!company) {
            throw new Error('La empresa no existe');
        }

        let user: User | undefined = undefined;
        if (createVehicle.user_id !== null && createVehicle.user_id !== undefined) {
            const foundUser = await this.userRepository.findOne({
            where: { id: createVehicle.user_id },
            });
            if (!foundUser) {
            throw new Error('El usuario no existe');
            }
            user = foundUser;
        }

        const vehicleData = this.vehicleRepository.create({
            ...createVehicle,
            company: company,
            user: user,
            plate: createVehicle.plate.toUpperCase(),
            partner:createVehicle.partner.toUpperCase()
        });

        const vehicle = await this.vehicleRepository.save(vehicleData);

        return {
            message: 'Vehicle created successfully',
            result: vehicle,
            status: 201,
        };
        }


}
