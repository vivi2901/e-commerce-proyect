import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { Role } from 'generated/prisma';

export class CreateUserDto {
  @ApiProperty({ required: true})
  @IsEmail()
  email: string;

  @ApiProperty({ required: true})
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ required: true})
  @IsString()
  name: string;

  @ApiProperty({ enum: Role, required: true})
  @IsEnum(Role)
  role: Role;
}
