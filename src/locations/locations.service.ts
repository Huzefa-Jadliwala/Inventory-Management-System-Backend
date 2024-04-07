import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from './entities/location.entity';
import { GetLocationDto } from './dto/get-location.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: mongoose.Model<Location>,
  ) {}

  async findAll(): Promise<GetLocationDto[]> {
    try {
      const res = await this.locationModel.find();
      const dummy = plainToInstance(GetLocationDto, res);
      return dummy;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
  async create(createLocationDto: CreateLocationDto): Promise<GetLocationDto> {
    try {
      const createdLocation = new this.locationModel(createLocationDto);
      const res = createdLocation.save();
      const dummy = plainToInstance(GetLocationDto, res);
      return dummy;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async findById(id: string): Promise<GetLocationDto> {
    try {
      const res = await this.locationModel.findById(id);
      if (!res) {
        throw new NotFoundException(`Location with ID ${id} not found`);
      }
      const dummy = plainToInstance(GetLocationDto, res);
      return dummy;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async UpdateById(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<GetLocationDto> {
    try {
      const res = await this.locationModel.findByIdAndUpdate(
        id,
        updateLocationDto,
      );
      if (!res) {
        throw new NotFoundException(`Location with ID ${id} not found`);
      }
      const dummy = plainToInstance(GetLocationDto, res);
      return dummy;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async DeleteById(id: string): Promise<GetLocationDto> {
    try {
      const res = await this.locationModel.findByIdAndDelete(id);
      if (!res) {
        throw new NotFoundException(`Location with ID ${id} not found`);
      }
      const dummy = plainToInstance(GetLocationDto, res);
      return dummy;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async findByUserId(userId: string): Promise<GetLocationDto[]> {
    try {
      const res = await this.locationModel.find({ user_id: userId });
      if (!res) {
        throw new NotFoundException(
          `Location with User ID ${userId} not found`,
        );
      }
      const dummy = plainToInstance(GetLocationDto, res);
      return dummy;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
