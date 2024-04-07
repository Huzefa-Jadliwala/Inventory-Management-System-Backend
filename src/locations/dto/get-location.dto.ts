// create-location.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class GetLocationDto {
  @ApiProperty({
    description: 'this is the unique id of the location',
    example: '6611bfde3a1324482976c27c',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  _id: string;

  @ApiProperty({
    description: 'this is the City of the location',
    example: 'Chemnitz',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  city: string;

  @ApiProperty({
    description: 'this is the Pincode of the location',
    example: '09126',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  pincode: string;

  @ApiProperty({
    description: 'this is the Province of the location',
    example: 'Saxsony',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  province: string;

  @ApiProperty({
    description: 'this is the Country of the location',
    example: 'Germany',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  country: string;

  @ApiProperty({
    description: 'this is the unique id of the user of the location',
    example: '6611bfde3a1334482976c27c',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  user_id: string;
}
