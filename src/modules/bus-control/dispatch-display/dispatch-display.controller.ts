import { Controller, Get, Param, Query } from '@nestjs/common';
import { DispatchDisplayService } from './dispatch-display.service';

@Controller('despacho_display')
export class DispatchDisplayController {
  constructor(private readonly dispatchDisplayService: DispatchDisplayService) {}

  @Get('bus/:idbus/itinerarios')
  async obtenerItinerarios(
    @Param('idbus') idbus: string,
    @Query('date') date?: string,
  ) {
    let formattedDate: string;
  
    if (date) {
      const [day, month, year] = date.split('/');
      formattedDate = `${year}-${month}-${day}`; // Convertir a 'YYYY-MM-DD'
    } else {
      formattedDate = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
    }
  
    return this.dispatchDisplayService.obtenerItinerariosDeBus(parseInt(idbus), formattedDate);
  }
}
