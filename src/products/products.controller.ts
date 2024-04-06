import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Version,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiProduces('application/json')
  @ApiOperation({ summary: 'Get all products' })
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiProduces('application/json')
  @ApiOperation({ summary: 'Get product by ID' })
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Version('1')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiProduces('application/json')
  async remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id);
  }

  @Get('search')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiProduces('application/json')
  @ApiOperation({ summary: 'Find products by criteria' })
  async findByCriteria(@Query() query: any): Promise<Product[]> {
    return this.productsService.findByCriteria(query);
  }
}
