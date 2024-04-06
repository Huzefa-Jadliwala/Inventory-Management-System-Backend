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
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiConsumes,
  ApiProduces,
} from '@nestjs/swagger'; // Import ApiTags, ApiOperation, and ApiBody
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@ApiTags('users') // Add Api Tags decorator with 'users'
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Gets all users' }) // Add ApiOperation decorator with summary
  @ApiBody({}) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create a user' }) // Add ApiOperation decorator with summary
  @ApiBody({ type: CreateUserDto }) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }

  @Get(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get a user' }) // Add ApiOperation decorator with summary
  @ApiBody({}) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async getUser(@Param('id') id: string): Promise<GetUserDto> {
    return this.userService.findById(id);
  }

  @Put(':id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update a user' }) // Add ApiOperation decorator with summary
  @ApiBody({ type: UpdateUserDto }) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async updateUser(
    @Body() body: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User | null> {
    return this.userService.updateById(id, body);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'deleted a user' }) // Add ApiOperation decorator with summary
  @ApiBody({}) // Add ApiBody decorator to specify the request body type
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  async deleteUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.deleteById(id);
  }
}
