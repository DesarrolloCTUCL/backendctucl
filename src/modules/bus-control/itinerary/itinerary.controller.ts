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
  constructor(private readonly itineraryService: ItineraryService) { }


  @Get()
  async getAll() {
    const data = await this.itineraryService.findAll();

    return {
      status: 'success',
      data,
    };
  }

  @Get('line/:line')
  async getByLine(@Param('line') line: string) {
    const data = await this.itineraryService.findByLine(line);

    return {
      status: 'success',
      data,
    };
  }


  @Post('bulk-update')
  async bulkUpdate(@Body() bulkDto: BulkUpdateItineraryDto) {
    const data = await this.itineraryService.bulkUpdate(bulkDto);

    return {
      status: 'success',
      data,
    };
  }

  @Post('import-excel')
  @UseInterceptors(FileInterceptor('file'))
  async importExcel(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se subió archivo');
    }
    const data = await this.itineraryService.importFromExcel(file.buffer)

    return {
      status: 'success',
      data,
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const data = await this.itineraryService.findOne(id);
    return {
      status: 'success',
      data,
    };
  }

  @Put(':id')
  async updateItinerary(
    @Param('id') id: string,
    @Body() updateDto: UpdateItineraryDto,
  ) {
    const data = await this.itineraryService.update(id, updateDto);

    return {
      status: 'success',
      data,
    };
  }
}
