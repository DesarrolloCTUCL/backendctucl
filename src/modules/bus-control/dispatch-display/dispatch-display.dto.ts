export class ShiftDTO {
  shift_id: number | null;
  shift: string;
  chainpc: {
    numero: number;
    name: string;
    radius: number;
    lat: number;
    long: number;
    hora: string;
  }[];
}

export class DispatchdisplayDTO {
  recorrido: string;
  hora_despacho: string;
  hora_fin: string;
  turno: ShiftDTO;
}

export class DispatchResponseDTO {
  vehicle_id: number;
  vehicle_register: number; 
  itinerary_id: number | null;
  itinerary: string;
  date: Date | null;
  itinerarios: DispatchdisplayDTO[];
}

export class ChainPcDTO {
  numero: number;
  name: string;
  radius: number;
  lat: number;
  long: number;
  hora: string;
}
