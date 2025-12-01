import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Between, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/database/entities/vehicle.entity';
import { User } from 'src/database/entities/user.entity';
import { Company } from 'src/database/entities/company.entity';
import { PassengerCounter } from 'src/database/entities/passenger-counter.entity';
import { CreatePassengerCounterDto } from './dto/create-counter.dto';
import { Itinerary } from 'src/database/entities/itinerary.entity';
import * as moment from 'moment-timezone';
import { Schedule } from 'src/database/entities/schedule.entity';
import { SharedVehicleDto } from './dto/shared-vehicle.dto';
import { AccountType } from 'src/common/enum/account-type.enum';

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
        @InjectRepository(Schedule)
        private readonly scheduleRepository: Repository<Schedule>,
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
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
        const despacho = await this.scheduleRepository.findOne({
			where: {
                vehicle: { id: 1539 },
                date: Between(startOfDay, endOfDay),
            },
			order: { date: 'DESC' },
		});

		if (!despacho) {
			throw new NotFoundException(
				`No itinerary found for vehicle ${createCounter.register_vehicle} on date ${today}`,
			);
		}
        const itinerarios = await this.itineraryRepository.find({
            where: { itinerary: despacho.itinerary, is_active: true, },
            
            order: { start_time: 'ASC' },
            relations: ['shift'],
        });
        console.log(itinerarios)

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


    async getVehiclesByUser(user_id: number) {
        const user = await this.userRepository.findOne({ 
            where: { id: user_id, status: true }
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${user_id} not found`);
        }
        if (!user.shared_vehicles || !Array.isArray(user.shared_vehicles) || user.shared_vehicles.length === 0) {
            throw new NotFoundException(`User with ID ${user_id} doesn't have vehicles`);
        }
        const vehicleRegisters = user.shared_vehicles.map(item => item.register);
        const vehicles = await this.vehicleRepository.find({
            where: {
                register: In(vehicleRegisters),
                status: true
            },
             relations: {
                company: true,
                user: true,
                line:true
            },
            select: {
                id: true,
                register: true,
                operation_status: true,
                latitude:true,
                longitude:true,
                line:{
                    id:true,
                    name:true,
                    number:true
                },
                company: {
                    id: true,
                    name: true
                },
                user: {
                    id: true,
                    name: true,
                    lastname: true
                }
            }
        });
        return {
            message: "Vehicles retrieved successfully",
            result: vehicles
        };
    }

    async sharedVehicle(sharedVehicleDto: SharedVehicleDto) {
    // Validar que el usuario existe
        const user = await this.userRepository.findOne({ 
            where: { id: sharedVehicleDto.user_id, status: true }
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${sharedVehicleDto.user_id} not found`);
        }

        // Validar que el vehículo existe
        const vehicle = await this.vehicleRepository.findOne({
            where: { register: sharedVehicleDto.register_vehicle, status: true }
        });

        if (!vehicle) {
            throw new NotFoundException(`Vehicle with register ${sharedVehicleDto.register_vehicle} not found`);
        }

        // Inicializar shared_vehicles si está vacío o es null
        if (!user.shared_vehicles || !Array.isArray(user.shared_vehicles) || user.shared_vehicles.length === 0) {
            user.shared_vehicles = [{ id: vehicle.id, register: vehicle.register }];
            await this.userRepository.save(user);
            
            return {
                message: "The vehicle had no registration, 1 new one is added",
                result: user
            };
        }

        // Verificar si el vehículo ya está compartido
        const vehicleExists = user.shared_vehicles.some(item => item.register === vehicle.register);
        
        if (vehicleExists) {
            return {
                message: `The vehicle with registration number ${vehicle.register} already exists`,
                result: user
            };
        }

        // Agregar el nuevo vehículo
        user.shared_vehicles.push({ id: vehicle.id, register: vehicle.register });
        await this.userRepository.save(user);

        return {
            message: `The vehicle with registration number ${vehicle.register} has been added`,
            result: user
        };
    }


    async deleteSharedVehicle(sharedVehicleDto: SharedVehicleDto) {
    // Validar que el usuario existe
        const user = await this.userRepository.findOne({ 
            where: { id: sharedVehicleDto.user_id, status: true }
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${sharedVehicleDto.user_id} not found`);
        }

        // Validar que el usuario tiene vehículos compartidos
        if (!user.shared_vehicles || !Array.isArray(user.shared_vehicles) || user.shared_vehicles.length === 0) {
            throw new NotFoundException(`User with ID ${sharedVehicleDto.user_id} doesn't have shared vehicles`);
        }

        // Verificar si el vehículo existe
        const vehicleExists = user.shared_vehicles.some(
            item => item.register === sharedVehicleDto.register_vehicle
        );

        if (!vehicleExists) {
            throw new NotFoundException(
                `Vehicle with register ${sharedVehicleDto.register_vehicle} is not shared with this user`
            );
        }

        // Filtrar el vehículo (remover el que coincida)
        user.shared_vehicles = user.shared_vehicles.filter(
            item => item.register !== sharedVehicleDto.register_vehicle
        );

        // Guardar los cambios
        await this.userRepository.save(user);

        return {
            message: `Vehicle with register ${sharedVehicleDto.register_vehicle} has been removed successfully`,
            result: {
                user_id: user.id,
                shared_vehicles: user.shared_vehicles
            }
        };
    }

    async updateLocationByDeviceId(device_id: number, lat: number, lng: number) {
            if (!device_id) {
                throw new BadRequestException("device_id no puede ser null");
            }

            // Aquí usamos register (campo real de tu BD)
            const vehicle = await this.vehicleRepository.findOne({
                where: { register: device_id }  
            });

            if (!vehicle) {
                console.warn(`⚠️ No existe vehículo con register = ${device_id}`);
                return;
            }

    vehicle.latitude = lat;
    vehicle.longitude = lng;

    await this.vehicleRepository.save(vehicle);

    console.log(
        `🚍 Vehículo ${vehicle.register} actualizado → lat:${lat}, lng:${lng}`
    );
}

async getMinimalVehicles() {
    const vehicles = await this.vehicleRepository.find({
        where: { status: true },
        relations: { line: true }
    });

    // Obtener todos los usuarios para buscar shared_vehicles
    const users = await this.userRepository.find({
        where: { role: AccountType.PARTNER }
    });

    const response = vehicles.map(vehicle => {
        // Buscar un usuario cuyo shared_vehicles tenga al vehículo en la primera posición
        let owner: { id: number; name: string; lastname: string } | null = null;

        for (const user of users) {
            if (
                user.shared_vehicles &&
                Array.isArray(user.shared_vehicles) &&
                user.shared_vehicles.length > 0
            ) {
                const firstShared = user.shared_vehicles[0];

                if (firstShared.id === vehicle.id) {
                    owner = {
                        id: user.id,
                        name: user.name,
                        lastname: user.lastname
                    };
                    break;
                }
            }
        }

        return {
            vehicle_id: vehicle.id,
            register: vehicle.register,
            group: vehicle.grupo,
            latitude: vehicle.latitude,
            longitude: vehicle.longitude,
            line_id: vehicle.line?.id ?? null,
            user_id: owner?.id ?? null,   
            name: owner?.name ?? null,
            last_name: owner?.lastname ?? null
        };
    });

    return {
        status: "Vehicles retrieved successfully",
        data: response
    };
}


    
}
