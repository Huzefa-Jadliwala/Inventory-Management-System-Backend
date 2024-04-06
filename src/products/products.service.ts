import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MongoDBErrorHandler } from '../core/handlers/mongodb-error.handler';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const createdProduct = await this.productModel.create(createProductDto);
      return createdProduct;
    } catch (error) {
      return MongoDBErrorHandler(error);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productModel.find();
    } catch (error) {
      return MongoDBErrorHandler(error);
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id);

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return product;
    } catch (error) {
      return MongoDBErrorHandler(error);
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        updateProductDto,
        {
          new: true,
          runValidators: true,
        },
      );

      if (!updatedProduct) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return updatedProduct;
    } catch (error) {
      return MongoDBErrorHandler(error);
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      const deletedProduct = await this.productModel.findByIdAndDelete(id);
      if (!deletedProduct) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return deletedProduct;
    } catch (error) {
      return MongoDBErrorHandler(error);
    }
  }

  async findByCriteria(criteria: any): Promise<Product[]> {
    try {
      return await this.productModel.find(criteria);
    } catch (error) {
      return MongoDBErrorHandler(error);
    }
  }
}
