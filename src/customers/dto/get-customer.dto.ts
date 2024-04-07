import { ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
@Exclude()
export class GetCustomerDto {
  @ApiProperty({
    description: 'this is the unique id of the customer',
    example: '6611bfde3a1334482976c27c',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  _id: string;

  @ApiProperty({
    description: 'this is the name of the customer',
    example: 'ABC Private Limited',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: 'this is the Phone Number of the customer',
    example: '9988554466',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  phone_number: string;

  @ApiProperty({
    description: 'this is the unique id of the location of customer',
    example: '6611bfde3a1334482976c27c',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  location_id: string;

  @ApiProperty({
    description: 'this is the unique id of user who have this customer',
    example: '6611bfde3a1334482976c27c',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  user_id: string;
}
