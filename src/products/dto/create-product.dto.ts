import { ApiProperty } from '@nestjs/swagger';
import {  IsString, IsNumber, IsOptional, IsNotEmpty, MinLength, MaxLength, IsPositive, Min, IsUUID, IsInt } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty({ message: 'The name cannot be empty' })
  @MinLength(3, { message: 'The name must be at least 3 characters' })
  @MaxLength(50, { message: 'The name must not exceed 50 characters' })
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'The description must not exceed 200 characters' })
  description?: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty({ message: 'The price cannot be empty' })
  @IsPositive({ message: 'The price must be a positive number' })
  price: number;

  @ApiProperty({ required: true })
  @IsInt({ message: 'The quantity must be an integer number' })
  @IsNotEmpty({ message: 'The quantity cannot be empty' })
  @Min(0, { message: 'The quantity cannot be negative' })
  quantity: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID('4', { message: 'The category ID must be a valid UUID' })
  categoryId?: string;
}
