import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/database/entities/vehicle.entity';
import { User } from 'src/database/entities/user.entity';
import { Company } from 'src/database/entities/company.entity';
import { PassengerCounter } from 'src/database/entities/passenger-counter.entity';
import { CreatePassengerCounterDto } from './dto/create-counter.dto';
import { Itinerary } from 'src/database/entities/itinerary.entity';
import * as moment from 'moment-timezone';

@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
        @InjectRepository(PassengerCounter)
        private readonly passengerRepository: Repository<PassengerCounter>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
        @InjectRepository(Itinerary)
        private readonly itineraryRepository: Repository<Itinerary>,
    ) { }


    async create(createVehicle: CreateVehicleDto) {
        const company = await this.companyRepository.findOne({
            where: { id: createVehicle.company_id },
        });

        if (!company) {
            throw new NotFoundException(`The Company with ${createVehicle.company_id} does not exists`);
        }

        let user: User | undefined = undefined;
        if (createVehicle.user_id !== null && createVehicle.user_id !== undefined) {
            const foundUser = await this.userRepository.findOne({
                where: { id: createVehicle.user_id },
            });
            if (!foundUser) {
                throw new NotFoundException(`The User with ${createVehicle.user_id} does not exists`);
            }
            user = foundUser;
        }

        const vehicleData = this.vehicleRepository.create({
            ...createVehicle,
            company: company,
            user: user,
            plate: createVehicle.plate.toUpperCase(),
        });

        const vehicle = await this.vehicleRepository.save(vehicleData);


        return {
            message: 'Vehicle created successfully',
            result: vehicle,
            status: 201,
        };
    }

    async findCountersById(id: number, date: string): Promise<any[]> {
        const [year, month, day] = date.split('-').map(Number);
        const startDate = new Date(year, month - 1, day, 0, 0, 0, 0);
        const endDate = new Date(year, month - 1, day, 23, 59, 59, 999);

        const vehicle = await this.vehicleRepository.findOneBy({ id });
        if (!vehicle) {
            throw new NotFoundException(`Vehicle with ID ${id} not found`);
        }

        const results = await this.passengerRepository.find({
            where: {
                vehicle: vehicle,
                created_at: Between(startDate, endDate),
            },
        });

        if (!results || results.length === 0) {
            throw new NotFoundException(
                `No passenger counters found for vehicle ID ${id} on ${date}`,
            );
        }

        // Convertir timestamp a hora local (ejemplo: 'America/Lima' o tu zona horaria)
        return results.map((r) => ({
            ...r,
            timestamp: moment(r.created_at).tz('America/Lima').format('YYYY-MM-DD HH:mm:ss'),
        }));
    }



    async registerCounter(createCounter: CreatePassengerCounterDto) {

        const vehicle = await this.vehicleRepository.findOne({
            where: { register: createCounter.register_vehicle, status: true },
        });
        if (!vehicle) {
            throw new NotFoundException(`Vehicle with register ${createCounter.register_vehicle} not found`);
        }

        const today = new Date();

        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        let lastCounter = await this.passengerRepository.findOne({
            where: {
                vehicle,
                created_at: Between(startOfDay, endOfDay),
            },
            order: { created_at: 'DESC' },
        });

        if (!lastCounter) {
            const newCounter = this.passengerRepository.create({
            vehicle,
            passengers: createCounter.passengers,
            });
            await this.passengerRepository.save(newCounter);
            return {
                message: 'Counter created successfully',
                result: newCounter,
            }
        }
        
        lastCounter.passengers = lastCounter.passengers + createCounter.passengers
        await this.passengerRepository.save(lastCounter)

        return {
            message: 'Counter updated successfully',
            result: lastCounter,
        };
    }


    async assignVehicleToUser(register: number, user_id: number) {
        const user = await this.userRepository.findOne({ where: { id: user_id, status: true } })
        if (!user) {
            throw new NotFoundException(`User With ID ${user_id}  not found`)
        }
        const vehicle = await this.vehicleRepository.findOne({ where: { status: true, register: register } })
        if (!vehicle) {
            throw new NotFoundException(`Vehicle With Register ${register}  not found`)
        }

        vehicle.user = user;

        await this.vehicleRepository.save(vehicle);
        return {
            message: `Vehicle ${register} successfully assigned to User ${user_id}`,
            result: vehicle,
        };
    }

}
