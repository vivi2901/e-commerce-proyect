import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, Matches, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { Role } from 'generated/prisma';

export class CreateUserDto {
  @ApiProperty({ required: true})
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'The e-mail is invalid' })
  email: string;

  @ApiProperty({ required: true})
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiProperty({ required: true})
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MinLength(3, { message: 'The name must be at least 3 characters' })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'The name can only contain letters and spaces',
  })
  name: string;

  @ApiProperty({ enum: Role, required: true})
  @IsNotEmpty({ message: 'Role is required' })
  @IsEnum(Role, { message: 'The role must be ADMIN, USER or MANAGER' })
  role: Role;
}
