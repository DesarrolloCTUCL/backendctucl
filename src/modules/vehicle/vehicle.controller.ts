import { Body, Controller, Post, Get, Param, Query, BadRequestException, Put, Patch, Delete } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { CreatePassengerCounterDto } from './dto/create-counter.dto';
import { SharedVehicleDto } from './dto/shared-vehicle.dto';
import { UpdateVehicleGpsDto } from './dto/update-gps.dto';

@Controller('vehicle')
export class VehicleController {
	constructor(private readonly vehicleService: VehicleService) { }

	@Post('create')
	create(
		@Body() createVehicle: CreateVehicleDto
	) {
		return this.vehicleService.create(createVehicle);
	}

	@Post('counter')
	counter(@Body() createCounter: CreatePassengerCounterDto) {
		return this.vehicleService.registerCounter(createCounter);
	}

	@Post('shared_vehicle')
	sharedVehicle(@Body() sharedVehicle: SharedVehicleDto) {
		return this.vehicleService.sharedVehicle(sharedVehicle);
	}

	@Delete('shared_vehicle')
	async deleteSharedVehicle(@Body() sharedVehicleDto: SharedVehicleDto) {
		return this.vehicleService.deleteSharedVehicle(sharedVehicleDto);
	}

	@Get('counter/:id')
	getCounters(
		@Param('id') id: number,
		@Query('date') date: string
	) {
		if (!date) {
			throw new BadRequestException('Query parameter "date" is required');
		}
		return this.vehicleService.findCountersById(id, date);
	}

	@Get('user/:id')
	getVehiclesByUser(
		@Param('id') id: number
	) {
		return this.vehicleService.getVehiclesByUser(+id);
	}

	@Patch('/assign_vehicle')
	assignVehicleToUser(
		@Query('register') register: number,
		@Query('user_id') user_id: number
	) {
		return this.vehicleService.assignVehicleToUser(+register, +user_id)
	}


	//@Post('gps/:register')
	//updateVehicleGps(
	//	@Param('register') register: number,
		//@Body() updateVehicleGpsDto: UpdateVehicleGpsDto
	//) {
	//	return this.vehicleService.updateVehicleGps(+register,updateVehicleGpsDto)
	//}
}
