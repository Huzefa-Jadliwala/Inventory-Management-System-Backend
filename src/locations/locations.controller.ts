import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { Location } from './entities/location.entity';
import { GetLocationDto } from './dto/get-location.dto';

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
  findAllLocations(): Promise<GetLocationDto[]> {
    return this.locationsService.findAll();
  }

  @Get('user/:userId')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get all the location on the basis of user id' }) // Add ApiOperation decorator with summary
  @ApiBody({ type: UpdateLocationDto }) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async getLocationByUser(
    @Param('userId') userId: string,
  ): Promise<GetLocationDto[]> {
    return this.locationsService.findByUserId(userId);
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Gets a location on basis of id' }) // Add ApiOperation decorator with summary
  @ApiBody({}) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async getLocation(@Param('id') id: string): Promise<GetLocationDto> {
    return this.locationsService.findById(id);
  }

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates a new location' }) // Add ApiOperation decorator with summary
  @ApiBody({ type: CreateLocationDto }) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async createLocation(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<GetLocationDto> {
    return this.locationsService.create(createLocationDto);
  }

  @Put(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Updated a location on the basis of id' }) // Add ApiOperation decorator with summary
  @ApiBody({ type: UpdateLocationDto }) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async updateLocation(
    @Body() updateLocationDto: UpdateLocationDto,
    @Param('id') id: string,
  ): Promise<GetLocationDto> {
    return this.locationsService.UpdateById(id, updateLocationDto);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a location on the basis of id' }) // Add ApiOperation decorator with summary
  @ApiBody({}) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async deleteteLocation(@Param('id') id: string): Promise<GetLocationDto> {
    return this.locationsService.DeleteById(id);
  }
}
