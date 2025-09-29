import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "typeorm";
import { TransactionsController } from "./transactions.controller";
import { RechargepointService } from "../recharge-point/recharge-point.service";


@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    controllers:[TransactionsController],
    providers:[RechargepointService]
})

export class TransactionsModule{}