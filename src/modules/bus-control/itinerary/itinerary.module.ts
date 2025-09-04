// itinerary.controller.ts
import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ItineraryService } from './itinerary.service';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { BulkUpdateItineraryDto } from './dto/update-itinerary-excel.dto';

@Controller('itineraries')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  // 🔹 Obtener todos los itinerarios activos
  @Get()
  getAll() {
    return this.itineraryService.findAll();
  }

  // 🔹 Obtener un itinerario activo por code
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.itineraryService.findOne(id);
  }

  // 🔹 Actualizar un itinerario (versión actual, unitario)
  @Put(':id')
  updateItinerary(@Param('id') id: string, @Body() updateDto: UpdateItineraryDto) {
    return this.itineraryService.update(id, updateDto);
  }

  // 🔹 Obtener itinerarios filtrados por línea
  @Get('line/:line')
  getByLine(@Param('line') line: string) {
    return this.itineraryService.findByLine(line);
  }

  // 🔹 Actualización MASIVA con JSON
  @Put('bulk')
  bulkUpdate(@Body() body: BulkUpdateItineraryDto) {
    return this.itineraryService.bulkUpdate(body);
  }

  // 🔹 Importar itinerarios desde Excel
  @Post('import-excel')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 }, // máximo 5 MB
      fileFilter: (_req, file, cb) => {
        const ok =
          file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          file.mimetype === 'application/vnd.ms-excel';
        cb(ok ? null : new BadRequestException('Formato no permitido, usa .xlsx/.xls'), ok);
      },
    }),
  )
  async importExcel(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No se envió ningún archivo');
    return this.itineraryService.importFromExcel(file.buffer);
  }
}
