import { ApiProperty } from '@nestjs/swagger';
import { Type } from '../entities/user.entity';

// create-user.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateUserDto {
  @ApiProperty({
    description: 'this is the unique id of the user',
    example: '6611bfde3a1324482976c27c',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  _id: string;
  
  @ApiProperty({
    description: 'this is the name of the user',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: 'this is the email of the user',
    example: 'abc@test.gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty({
    description: 'this is the password of the user',
    example: 'secretpass@23',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;

  @ApiProperty({
    description: 'this is enum and the awailable options are: NORMAL | ADMIN',
    example: 'NORMAL',
  })
  @IsNotEmpty()
  @IsEnum(Type)
  @Expose()
  type: Type;
}
