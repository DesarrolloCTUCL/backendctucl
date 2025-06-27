import { Injectable } from '@nestjs/common';

@Injectable()
export class PassengerCounterService {


    async createPassengerCounter(data:any){

        try {
            return{
                message: 'Passenger counter created successfully',
                status: 200,
                result:data
            }
        } catch (error) {
            throw new Error('Error creating passenger counter: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }

    } 




}
