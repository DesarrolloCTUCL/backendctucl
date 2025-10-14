import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "src/database/entities/transaction.entity";
import { Repository } from "typeorm";
import { Device } from "src/database/entities/device.entity";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(Device)
        private readonly deviceRepository: Repository<Device>
    ){}
    async findTransactionsForToday() {
        return {
            message: 'Transactions',
            result: {},
            status: 200,
        };
    }

    async findTransactionsByBus(bus:number) {


        return {
            message: 'Transactions for bus',
            result: {},
            status: 200,
        }
    }


    async create(createTransactionDto: CreateTransactionDto) {
     
        const device = await this.deviceRepository.findOne({
            where:{code: createTransactionDto.device,status:true}
        })

        if(!device){
            throw new NotFoundException(`El dispositivo con el CODIGO ${createTransactionDto.device} no existe`);
        }
        const transactionData = this.transactionRepository.create(
            {
                ...createTransactionDto,
                device: device
            }
        )

        const transaction = await this.transactionRepository.save(transactionData);

        return {
            message: 'New Transactions has been added',
            result: transaction,
            status: 201,
        }
    }

}
