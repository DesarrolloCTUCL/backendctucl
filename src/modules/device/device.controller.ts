import { Controller, Post, Get, Body } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';

@Controller('device')
export class DeviceController {
	constructor(private readonly deviceService: DeviceService) { }

	@Post()
	create(@Body() createDeviceDto: CreateDeviceDto) {
		return this.deviceService.create(createDeviceDto)
	}



}
