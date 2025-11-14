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

  // ---------- EXISTENTES ----------
  @Get()
  getAll() {
    return this.itineraryService.findAll();
  }

  @Get('line/:line')
  getByLine(@Param('line') line: string) {
    return this.itineraryService.findByLine(line);
  }

  // ---------- NUEVOS ----------
  @Post('bulk-update')
  bulkUpdate(@Body() bulkDto: BulkUpdateItineraryDto) {
    return this.itineraryService.bulkUpdate(bulkDto);
  }

  @Post('import-excel')
  @UseInterceptors(FileInterceptor('file'))
  importExcel(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se subió archivo');
    }

    return this.itineraryService.importFromExcel(file.buffer);
  }

  // ⚠️ IMPORTANTE: ESTA RUTA SIEMPRE AL FINAL ⚠️
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
}
