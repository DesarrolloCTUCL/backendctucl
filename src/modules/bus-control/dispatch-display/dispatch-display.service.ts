import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../../../database/entities/schedule.entity';
import { Itinerary } from '../../../database/entities/itinerary.entity';
import { DispatchdisplayDTO  } from './dispatch-display.dto';

@Injectable()
export class DispatchDisplayService {
  constructor(
    @InjectRepository(Schedule)
    private readonly despachoRepo: Repository<Schedule>,
    @InjectRepository(Itinerary)
    private readonly itinerarioRepo: Repository<Itinerary>,
  ) {}

  async obtenerItinerariosDeBus(vehicle_id: number): Promise<{
    vehicle_id: number;
    itinerary: string;
    date: string | null;
    itinerarios: DispatchdisplayDTO[];
  }> {
    const despacho = await this.despachoRepo.findOne({
        where: { vehicle_id: vehicle_id.toString() },  // convierto número a string
        order: { date: 'DESC' },
    });

    if (!despacho) {
    return {
        vehicle_id,
        itinerary: '',
        date: null,
        itinerarios: [],
    };
    }

    const itinerarios = await this.itinerarioRepo.find({
      where: { itinerary: despacho.itinerary },
      order: { start_time: 'ASC' },
    });

    return {
      vehicle_id,
      itinerary: despacho.itinerary,
      date: despacho.date,
      itinerarios: itinerarios.map(it => ({
        recorrido: it.route,
        hora_despacho: it.start_time,
        hora_fin: it.end_time,
      })),
    };
  }
}
