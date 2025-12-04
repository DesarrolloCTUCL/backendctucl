import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between } from 'typeorm';
import { Schedule } from '../../../database/entities/schedule.entity';
import { Itinerary } from '../../../database/entities/itinerary.entity';
import { BusStation } from '../../../database/entities/bus-station.entity';
import { DispatchdisplayDTO, DispatchResponseDTO, ChainPcDTO } from './dispatch-display.dto';

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

    const despacho = await this.despachoRepo
    .createQueryBuilder('d')
    .leftJoinAndSelect('d.vehicle', 'vehicle')
    .where('vehicle.id = :id', { id: vehicle_id })
    .andWhere("DATE(d.date) = :date", { date })
    .orderBy('d.date', 'DESC')
    .getOne();
      

    if (!despacho) {
      throw new NotFoundException(
        `No itinerary found for vehicle ${vehicle_id} on date ${date}`,
      );
    }

    // ---- ITINERARIOS ----
    const itinerarios = await this.itinerarioRepo.find({
      where: { itinerary: despacho.itinerary, is_active: true },
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

        // orden correcto según chainpc
        estaciones.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));

        // hora de inicio
        const [h, m, s] = it.start_time.split(':').map(Number);
        let currentTime = new Date();
        currentTime.setHours(h, m, s, 0);

        const timesArray = shift.times.split(',').map(t => parseFloat(t.trim()));

        let accumulatedSeconds = 0;

        estacionesFormateadas = estaciones.map((est, index) => {
          const rawTime = timesArray[index] || 0;

          const minutosEnteros = Math.floor(rawTime);
          const decimales = rawTime - minutosEnteros;

          const segundos = Math.round(decimales * 100);

          accumulatedSeconds += minutosEnteros * 60 + segundos;

          const timeWithOffset = new Date(
            currentTime.getTime() + accumulatedSeconds * 1000,
          );

          return {
            numero: ids[index],
            radius: est.radius,
            name: est.name,
            lat: est.lat,
            long: est.long,
            hora: timeWithOffset.toTimeString().slice(0, 8),
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
      vehicle_register: despacho.vehicle.register,
      itinerary: despacho.itinerary,
      itinerary_id: idItinerario,
      date: despacho.date,
      itinerarios: resultado,
    };
  }
}
