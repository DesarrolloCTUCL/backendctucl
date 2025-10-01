import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";


@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService
    ) { }

    @Get()
    getTransactionsToday() {
        return this.transactionsService.findTransactionsForToday();
    }
    
    @Post()
    create(@Body() createTransactionDto:CreateTransactionDto){
        return this.transactionsService.create(createTransactionDto);
    }

    @Get(':bus')
    getTransactionsTodayByBus(@Param('id') id: number){
        return this.transactionsService.findTransactionsByBus(id);
    }



}