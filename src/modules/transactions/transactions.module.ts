import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "src/database/entities/transaction.entity";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";
import { Device } from "src/database/entities/device.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Transaction,Device])],
    controllers:[TransactionsController],
    providers:[TransactionsService]
})

export class TransactionsModule{}