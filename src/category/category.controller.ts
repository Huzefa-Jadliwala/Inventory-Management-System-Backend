import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiConsumes,
  ApiProduces,
} from '@nestjs/swagger'; // Import ApiTags, ApiOperation, and ApiBody
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Category } from './schema/category.schema';

@ApiTags('categories') // Add ApiTags decorator with 'categories'
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new category' }) // Add ApiOperation decorator with summary
  @ApiBody({ type: CategoryDto }) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(@Body() categoryDto: CategoryDto): Promise<Category> {
    return await this.categoryService.create(categoryDto);
  }

  @Get()
  @Version('1')
  @ApiProduces('application/json')
  @ApiOperation({ summary: 'Get all categories' }) // Add ApiOperation decorator with summary
  async findAll() {
    return this.categoryService.findAll();
  }
}
