import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Schedule } from '../../../database/entities/schedule.entity';
import { Itinerary } from '../../../database/entities/itinerary.entity';
import { BusStation } from '../../../database/entities/bus-station.entity';
import { DispatchdisplayDTO } from './dispatch-display.dto';

@Injectable()
export class DispatchDisplayService {
  constructor(
    @InjectRepository(Schedule)
    private readonly despachoRepo: Repository<Schedule>,

    @InjectRepository(Itinerary)
    private readonly itinerarioRepo: Repository<Itinerary>,

    @InjectRepository(BusStation)
    private readonly busStationRepo: Repository<BusStation>,
  ) {}

  async obtenerItinerariosDeBus(vehicle_id: number): Promise<{
    vehicle_id: number;
    id: number | null;
    itinerary: string;
    date: string | null;
    itinerarios: DispatchdisplayDTO[];
  }> {
    const despacho = await this.despachoRepo.findOne({
      where: { vehicle_id: vehicle_id.toString() },
      order: { date: 'DESC' },
    });

    if (!despacho) {
      return {
        vehicle_id,
        itinerary: '',
        id: null,
        date: null,
        itinerarios: [],
      };
    }

    const itinerarios = await this.itinerarioRepo.find({
      where: { itinerary: despacho.itinerary },
      order: { start_time: 'ASC' },
      relations: ['shift'],
    });

    const resultado: DispatchdisplayDTO[] = [];
    const idItinerario = itinerarios[0]?.id || null;

    for (const it of itinerarios) {
      const shift = it.shift;
      let estacionesFormateadas: {
        numero: number;
        name: string;
        lat: number;
        long: number;
        hora: string;
      }[] = [];
      
      if (shift?.chainpc && shift?.times) {
        const ids = shift.chainpc.split(',').map(id => parseInt(id.trim()));
        const estaciones = await this.busStationRepo.findBy({ id: In(ids) });
        estaciones.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
      
        const [h, m, s] = it.start_time.split(':').map(Number);
        let currentTime = new Date();
        currentTime.setHours(h, m, s, 0);
      
        const timesArray = shift.times.split(',').map(t => parseInt(t.trim()));
        let accumulatedMinutes = 0;
      
        estacionesFormateadas = estaciones.map((est, index) => {
          const rawTime = timesArray[index] || 0;
          const minutosEnteros = Math.floor(rawTime);
          const decimales = rawTime - minutosEnteros;
        
          // Interpretar la parte decimal
          // Si es ~0.3 consideramos 30 segundos
          const segundos = Math.abs(decimales - 0.3) < 0.01 ? 30 : 0;
        
          accumulatedMinutes += minutosEnteros;
          // Calcular total en milisegundos: minutos + segundos
          const totalMilliseconds = (accumulatedMinutes * 60 + segundos) * 1000;
        
          const timeWithOffset = new Date(currentTime.getTime() + totalMilliseconds);
          const hora = timeWithOffset.toTimeString().slice(0, 8); // "HH:MM:SS"
        
          return {
            numero: ids[index],
            name: est.name,
            lat: est.lat,
            long: est.long,
            hora: hora,
          };
        });
        
      }
      

      resultado.push({
        recorrido: it.route,
        hora_despacho: it.start_time,
        hora_fin: it.end_time,
        turno: {
          itinerary: shift?.id || '',
          chainpc: estacionesFormateadas,
        },
      });
    }

    return {
      vehicle_id,
      itinerary: despacho.itinerary,
      id: idItinerario,
      date: despacho.date,
      itinerarios: resultado,
    };
  }
}
