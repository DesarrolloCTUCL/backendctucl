import { Injectable, NotFoundException } from '@nestjs/common';
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

        const isExistSerial = await this.deviceRepository.findOne({
            where: {serial:createDeviceDto.serial,status:true}
        })

        if(isExistSerial){
            throw new NotFoundException(`Ya existe un dispositivo con el serial ${createDeviceDto.serial}`);
        }

        const isExistImei = await this.deviceRepository.findOne({
            where: {imei:createDeviceDto.imei,status:true}
        })

        if(isExistImei){
            throw new NotFoundException(`Ya existe un dispositivo con el Imei ${createDeviceDto.imei}`);
        }
        const deviceData = this.deviceRepository.create(
            {
                ...createDeviceDto,
                name: createDeviceDto.name.toUpperCase(),
                description: createDeviceDto.description.toUpperCase(),
            }
        )

        const device = await this.deviceRepository.save(deviceData);
        return{
            message:"The Device was successfully created",
            result:device,
            status:201
        }

    }

    async findAll(){
        const devices =  await this.deviceRepository.find(
            {where:{status:true}}
        )
        return {
             message:`${devices.length} devices were found`,
             result:devices,
             status:201
        }
    }


}
