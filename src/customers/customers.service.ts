import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { GetCustomerDto } from './dto/get-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './entities/customer.entity';
import mongoose from 'mongoose';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: mongoose.Model<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<GetCustomerDto> {
    try {
      const createdCustomer = new this.customerModel(createCustomerDto);
      const res = createdCustomer.save();
      const dummy = plainToInstance(GetCustomerDto, res);
      return dummy;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async findAll(): Promise<GetCustomerDto[]> {
    try {
      const res = await this.customerModel.find();
      const dummy = plainToInstance(GetCustomerDto, res);
      return dummy;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async findOne(id: string): Promise<GetCustomerDto> {
    try {
      const Customer = await this.customerModel.findById(id);
      const dummy = plainToInstance(GetCustomerDto, Customer);
      return dummy;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<GetCustomerDto> {
    try {
      const Customer = await this.customerModel.findByIdAndUpdate(
        id,
        updateCustomerDto,
      );
      const UpdatedCustomer = await this.customerModel.findById(id);
      const dummy = plainToInstance(GetCustomerDto, UpdatedCustomer);
      return dummy;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async remove(id: string): Promise<GetCustomerDto> {
    try {
      const Customer = await this.customerModel.findByIdAndDelete(id);
      const dummy = plainToInstance(GetCustomerDto, Customer);
      return dummy;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
