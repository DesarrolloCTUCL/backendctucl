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
    // Si no manda fecha, usa la actual
    const formattedDate = date ?? new Date().toISOString().split('T')[0];
    const data =await this.dispatchDisplayService.obtenerItinerariosDeBus(
      parseInt(idbus),
      formattedDate
    )
    
    return {
      status: 'success',
      data: data,
    };
  }
  
}
