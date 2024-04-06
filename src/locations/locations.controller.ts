import { Controller, Get, Post, Body, Patch, Param, Delete, Version, HttpStatus, HttpCode } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import { Location } from './entities/location.entity';

@ApiTags('locations') // Add Api Tags decorator with 'locations'
@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Gets all locations' }) // Add ApiOperation decorator with summary
  @ApiBody({}) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  findAll(): Promise<Location[]> {
    return this.locationsService.findAll();
  }
}
