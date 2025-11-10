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
            where: { id: createVehicle.user_id },
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
            company: createVehicle.company,
            user: user,
            plate: createVehicle.plate.toUpperCase(),
            partner: createVehicle.partner.toUpperCase()
        });

        const vehicle = await this.vehicleRepository.save(vehicleData);


        return {
            message: 'Vehicle created successfully',
            result: vehicle,
            status: 201,
        };
    }

    async findAll(): Promise<Vehicle[]> {
        return this.vehicleRepository.find();
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
        bus: vehicle,
        timestamp: Between(startDate, endDate),
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
        timestamp: moment(r.timestamp).tz('America/Lima').format('YYYY-MM-DD HH:mm:ss'),
    }));
    }


    async findOne(id: number): Promise<Vehicle> {
        const result = await this.vehicleRepository.findOneBy({ register: id });
        if (!result) {
            throw new NotFoundException(`Vehicle with ID ${id} not found`);
        }
        return result;
    }

    async registerCounter(createCounter: CreatePassengerCounterDto) {
  
        const vehicle = await this.vehicleRepository.findOne({
            where: { register: createCounter.bus, status: true },
        });
        if (!vehicle) {
            throw new NotFoundException(`Vehicle with register ${createCounter.bus} not found`);
        }


        let itinerary: Itinerary | null = null;
        if (createCounter.itinerary_id != null) {
            itinerary = await this.itineraryRepository.findOne({
            where: { id: createCounter.itinerary_id },
            });
            if (!itinerary) {
            throw new NotFoundException(`Itinerary with ID ${createCounter.itinerary_id} not found`);
            }
        }

  
        const counter = this.passengerRepository.create({
            timestamp: createCounter.timestamp,
            bus: vehicle,
            itinerary: itinerary ?? undefined,
            special: createCounter.special,
        });

 
        const result = await this.passengerRepository.save(counter);

        return {
            message: 'Counter created successfully',
            result,
        };
    }

}
