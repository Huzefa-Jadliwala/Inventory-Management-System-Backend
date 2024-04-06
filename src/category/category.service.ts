import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { MongoDBErrorHandler } from 'src/core/handlers/mongodb-error.handler';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const createdCategory =
        await this.categoryModel.create(createCategoryDto);
      return createdCategory;
    } catch (error) {
      return MongoDBErrorHandler(error);
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryModel.find();
    } catch (error) {
      return MongoDBErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<Category> {
    try {
      const category = await this.categoryModel.findById(id);
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      return MongoDBErrorHandler(error);
    }
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const updatedCategory = await this.categoryModel.findByIdAndUpdate(
        id,
        updateCategoryDto,
        { new: true },
      );
      if (!updatedCategory) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return updatedCategory;
    } catch (error) {
      return MongoDBErrorHandler(error);
    }
  }

  async remove(id: string): Promise<Category> {
    try {
      const deletedCategory = await this.categoryModel.findByIdAndDelete(id);
      if (!deletedCategory) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      return deletedCategory;
    } catch (error) {
      return MongoDBErrorHandler(error);
    }
  }
}
