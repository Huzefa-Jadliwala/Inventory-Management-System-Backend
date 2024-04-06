import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async create(user: User): Promise<User> {
    const res = this.userModel.create(user);
    return res;
  }

  async findById(id: string): Promise<User | null> {
    const res = this.userModel.findById(id);
    if (!res) {
      throw new NotFoundException(`User with ID ${res} not found`);
    }
    return res;
  }

  async updateById(id: string, user: User): Promise<User | null> {
    const res = this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
    if (!res) {
      throw new NotFoundException(`User with ID ${res} not found`);
    }
    return res;
  }

  async deleteById(id: string): Promise<User | null> {
    const res = this.userModel.findByIdAndDelete(id);
    if (!res) {
      throw new NotFoundException(`User with ID ${res} not found`);
    }
    return res;
  }
}
