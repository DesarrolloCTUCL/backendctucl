import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "src/database/entities/transaction.entity";
import { Repository } from "typeorm";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly userRepository: Repository<Transaction>,
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
        console.log(createTransactionDto);
        return {
            message: 'New Transactions has been added',
            result: createTransactionDto,
            status: 201,
        }
    }

}
