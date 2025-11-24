import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Schedule } from '../../../database/entities/schedule.entity';
import { Itinerary } from '../../../database/entities/itinerary.entity';
import { BusStation } from '../../../database/entities/bus-station.entity';
import { DispatchdisplayDTO, DispatchResponseDTO,ChainPcDTO } from './dispatch-display.dto';

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

  async obtenerItinerariosDeBus(
    vehicle_id: number,
    date: string,
  ): Promise<DispatchResponseDTO> {
    const dateOnly = new Date(date); // 👈 convierte '2025-07-14' a Date
  
    const despacho = await this.despachoRepo.findOne({
      where: {
        vehicle: { id: vehicle_id },
        date: dateOnly,
      },
      order: { date: 'DESC' },
    });
  
    if (!despacho) {
      throw new NotFoundException(
        `No itinerary found for vehicle ${vehicle_id} on date ${date}`,
      );
    }
  
    const itinerarios = await this.itinerarioRepo.find({
      where: {
        itinerary: despacho.itinerary.itinerary, // ← string correcto
        is_active: true,
      },
      
      order: { start_time: 'ASC' },
      relations: ['shift'],
    });
  
    const resultado: DispatchdisplayDTO[] = [];
    const idItinerario = itinerarios[0]?.id || null;
  
    for (const it of itinerarios) {
      const shift = it.shift;
      let estacionesFormateadas: ChainPcDTO[] = [];

  
      if (shift?.chainpc && shift?.times) {
        const ids = shift.chainpc.split(',').map(id => parseInt(id.trim()));
        const estaciones = await this.busStationRepo.findBy({ id: In(ids) });
        estaciones.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
      
        const [h, m, s] = it.start_time.split(':').map(Number);
        let currentTime = new Date();
        currentTime.setHours(h, m, s, 0);
      
        const timesArray = shift.times.split(',').map(t => parseFloat(t.trim()));
        let accumulatedSeconds = 0;
      
        estacionesFormateadas = estaciones.map((est, index) => {
          const rawTime = timesArray[index] || 0;
      
          // Separa parte entera (minutos) y decimal (segundos)
          const minutosEnteros = Math.floor(rawTime);
          const decimales = rawTime - minutosEnteros;
      
          // Convierte la parte decimal a segundos (por ejemplo, .5 => 50 seg, .15 => 15 seg)
          const segundos = Math.round(decimales * 100); // .3 → 30, .5 → 50
      
          // Acumula tiempo total en segundos
          accumulatedSeconds += minutosEnteros * 60 + segundos;
      
          const timeWithOffset = new Date(currentTime.getTime() + accumulatedSeconds * 1000);
          const hora = timeWithOffset.toTimeString().slice(0, 8);
      
          return {
            numero: ids[index],
            radius: est.radius,
            name: est.name,
            lat: est.lat,
            long: est.long,
            hora,
          };
        });
      }
      
  
      resultado.push({
        recorrido: it.route,
        hora_despacho: it.start_time,
        hora_fin: it.end_time,
        turno: {
          shift_id: shift?.id || null,    
          shift: shift?.shiftcode || '',
          chainpc: estacionesFormateadas,
        },
      });
    }
  
    return {
      vehicle_id,
      itinerary: despacho.itinerary.itinerary,
      itinerary_id: idItinerario,
      date: despacho.date,
      itinerarios: resultado,
    };
  }
}  