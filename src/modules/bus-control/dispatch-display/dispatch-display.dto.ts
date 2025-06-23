
export class ShiftDTO {
  id: string;
  chainpc: {
    name: string;
    lat: number;
    long: number;
    hora: string; // Nueva propiedad
  }[];
}

export class DispatchdisplayDTO {
    recorrido: string;
    hora_despacho: string;
    hora_fin: string;
    turno: ShiftDTO;
  }
  