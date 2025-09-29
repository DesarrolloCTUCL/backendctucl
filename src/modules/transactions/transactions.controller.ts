import { Controller,Get,Post } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";


@Controller('transactions')
export class TransactionsController{
constructor(
    private readonly transactionsService: TransactionsService
){}


}