import { Injectable } from '@nestjs/common';
import { Category } from './schema/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CategoryDto } from './dto/category.dto';
import { MongoDBErrorHandler } from 'src/core/handlers/mongodb-error.handler';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: mongoose.Model<Category>,
  ) {}

  async create(createCategoryDto: CategoryDto): Promise<Category> {
    try {
      const createdCategory = new this.categoryModel(createCategoryDto);
      const savedCategory = await createdCategory.save();
      return savedCategory;
    } catch (error) {
      return MongoDBErrorHandler(error);
    }
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
}
