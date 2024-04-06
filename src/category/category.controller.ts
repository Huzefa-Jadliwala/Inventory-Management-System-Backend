import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'; // Import ApiTags, ApiOperation, and ApiBody
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@ApiTags('categories') // Add ApiTags decorator with 'categories'
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' }) // Add ApiOperation decorator with summary
  @ApiBody({ type: CategoryDto }) // Add ApiBody decorator to specify the request body type
  async create(@Body() categoryDto: CategoryDto) {
    return await this.categoryService.create(categoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' }) // Add ApiOperation decorator with summary
  async findAll() {
    return this.categoryService.findAll();
  }
}
