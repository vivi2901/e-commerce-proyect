import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ required: true})
  @IsString()
  name: string;

  @ApiProperty({ required: false})
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: true})
  @IsNumber()
  price: number;

  @ApiProperty({ required: true})
  @IsNumber()
  quantity: number;

  @ApiProperty({ required: true} )
  @IsString()
  @IsOptional()
  categoryId?: string;
}
