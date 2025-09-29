import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ItineraryService } from './itinerary.service';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { BulkUpdateItineraryDto } from './dto/update-itinerary-excel.dto';

@Controller('itineraries')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  // ---------- EXISTENTES ----------
  @Get()
  getAll() {
    return this.itineraryService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.itineraryService.findOne(id);
  }

  @Put(':id')
  updateItinerary(
    @Param('id') id: string,
    @Body() updateDto: UpdateItineraryDto,
  ) {
    return this.itineraryService.update(id, updateDto);
  }

  @Get('line/:line')
  getByLine(@Param('line') line: string) {
    return this.itineraryService.findByLine(line);
  }

  // ---------- NUEVOS ----------
  /**
   * Bulk update con JSON (útil para pruebas o frontend que procese Excel).
   */
  @Post('bulk-update')
  bulkUpdate(@Body() bulkDto: BulkUpdateItineraryDto) {
    return this.itineraryService.bulkUpdate(bulkDto);
  }

  /**
   * Importación directa de Excel desde frontend (form-data con archivo).
   */
  @Post('import-excel')
  @UseInterceptors(FileInterceptor('file'))
  importExcel(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No se subió archivo');
    }
    return this.itineraryService.importFromExcel(file.buffer);
  }
}
