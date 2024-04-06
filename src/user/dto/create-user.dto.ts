import { ApiProperty } from '@nestjs/swagger';
import { Type } from '../entities/user.entity';

// create-user.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'this is the name of the user',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'this is the email of the user',
    example: 'abc@test.gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'this is the password of the user',
    example: 'secretpass@23',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'this is enum and the awailable options are: NORMAL | ADMIN',
    example: 'NORMAL',
  })
  @IsNotEmpty()
  @IsString()
  type: Type;
}
