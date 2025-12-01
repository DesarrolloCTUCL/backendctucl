import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UpdateTimesDto } from './dto/update_times.dto';
import { Shift } from './../../../database/entities/shift.entity';

@ApiTags('Shift')
@Controller('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) { }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los turnos' })
  @ApiResponse({ status: 200, description: 'Lista completa de turnos', type: [Shift] })
  async getAll() {
    const data = await this.shiftService.findAll();

    return {
      status: 'success',
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un turno por su ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del turno' })
  @ApiResponse({ status: 200, description: 'Turno encontrado', type: Shift })
  @ApiResponse({ status: 404, description: 'Turno no encontrado' })
  async getOne(@Param('id') id: number) {

    const data = await this.shiftService.findOne(id);

    return {
      status: 'success',
      data,
    };
  }

  @Put(':id/times')
  @ApiOperation({
    summary: 'Actualizar los tiempos del turno',
    description:
      'Permite modificar la columna "times" de un turno. La cantidad de valores debe coincidir con la cantidad de puntos en "chainpc".',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID del turno a actualizar' })
  @ApiBody({ type: UpdateTimesDto })
  @ApiResponse({ status: 200, description: 'Tiempos actualizados correctamente', type: Shift })
  @ApiResponse({ status: 400, description: 'El número de tiempos no coincide con la cantidad de puntos en chainpc' })
  @ApiResponse({ status: 404, description: 'Turno no encontrado' })
  async updateTimes(
    @Param('id') id: number,
    @Body() body: UpdateTimesDto
  ) {
    const data = await this.shiftService.updateTimes(id, body.times)

    return {
      status: 'success',
      data,
    };
  }
}
