import { ApiProperty } from '@nestjs/swagger';
import {  IsString, IsNumber, IsOptional, IsNotEmpty, MinLength, MaxLength, IsPositive, Min, IsUUID, IsInt } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre no debe tener más de 50 caracteres' })
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'La descripción no debe superar los 200 caracteres' })
  description?: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  price: number;

  @ApiProperty({ required: true })
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @Min(0, { message: 'La cantidad no puede ser negativa' })
  quantity: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID('4', { message: 'El ID de la categoría debe ser un UUID válido' })
  categoryId?: string;
}
