import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/database/entities/device.entity';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DeviceService {
    constructor(
        @InjectRepository(Device)
        private readonly deviceRepository: Repository<Device>,
    ){}


    async create(createDeviceDto:CreateDeviceDto){

        return{
            message:"The Device was successfully created",
            result:createDeviceDto,
            status:201
        }

    }


}
