import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty({ message: 'The category name cannot be empty' })
  @MinLength(3, { message: 'The name must be at least 3 characters' })
  @MaxLength(50, { message: 'The name must not exceed 50 characters' })
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
    message: 'The name can only contain letters and spaces',
  })
  name: string;
}
