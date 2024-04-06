import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Football',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'This is ball which is used to play football',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The price of the product',
    example: 20.23,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 })
  @Type(() => Number)
  price: number;
}
