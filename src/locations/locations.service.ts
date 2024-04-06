import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: mongoose.Model<Location>,
  ) {}
  create(createLocationDto: CreateLocationDto) {
    return 'This action adds a new location';
  }

  async findAll(): Promise<Location[]> {
    return await this.locationModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
