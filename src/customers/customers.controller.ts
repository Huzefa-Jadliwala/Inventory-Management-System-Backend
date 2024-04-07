import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { GetCustomerDto } from './dto/get-customer.dto';

@ApiTags('customers') // Add Api Tags decorator with 'customers'
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new customers' }) // Add Api Operation decorator with summary
  @ApiBody({ type: CreateCustomerDto }) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<GetCustomerDto> {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Gets all customers' }) // Add Api Operation decorator with summary
  @ApiBody({}) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  findAll(): Promise<GetCustomerDto[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Gets a customers by id' }) // Add Api Operation decorator with summary
  @ApiBody({}) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  findOne(@Param('id') id: string): Promise<GetCustomerDto> {
    return this.customersService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a customers by id' }) // Add Api Operation decorator with summary
  @ApiBody({ type: UpdateCustomerDto }) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<GetCustomerDto> {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a customers by id' }) // Add Api Operation decorator with summary
  @ApiBody({}) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  remove(@Param('id') id: string): Promise<GetCustomerDto> {
    return this.customersService.remove(id);
  }
}
