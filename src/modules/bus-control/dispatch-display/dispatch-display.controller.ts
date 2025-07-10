import { Controller, Get, Param } from '@nestjs/common';
import { DispatchDisplayService } from './dispatch-display.service';

@Controller('despacho_display')
export class DispatchDisplayController {
  constructor(private readonly dispatchDisplayService: DispatchDisplayService) {}

  @Get('bus/:idbus/itinerarios')
  async obtenerItinerarios(@Param('idbus') idbus: string) {
    return this.dispatchDisplayService.obtenerItinerariosDeBus(parseInt(idbus));
  }
}