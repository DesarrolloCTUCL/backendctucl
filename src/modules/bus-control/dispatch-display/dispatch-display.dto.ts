// src/modules/bus-control/dto/dispatch-display.dto.ts

export class ChainPcDTO {
  name: string;
  radius: number;
  lat: number;
  long: number;
  hora: string;
}

export class ShiftDTO {
  shift_id: number | null;
  shift: string;
  chainpc: ChainPcDTO[];
}

export class DispatchdisplayDTO {
  recorrido: string;
  hora_despacho: string;
  hora_fin: string;
  turno: ShiftDTO;
}

export class DispatchdisplayResponseDTO {
  vehicl_id: number;
  itinerary: string;
  itinerary_id: number | null;
  date: Date | null;
  itinerarios: DispatchdisplayDTO[];
}
