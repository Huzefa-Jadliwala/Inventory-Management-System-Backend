import { Injectable } from '@nestjs/common';
import { Category } from './schema/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: mongoose.Model<Category>,
  ) {}

  async create(createCategoryDto: CategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
}
