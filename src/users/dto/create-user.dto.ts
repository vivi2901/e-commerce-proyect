import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, Matches, IsEnum, IsOptional } from 'class-validator';
import { Role } from 'generated/prisma';

export class CreateUserDto {
  @ApiProperty({ required: true})
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @ApiProperty({ required: true})
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({ required: true})
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  name: string;

  @ApiProperty({ enum: Role, required: true})
  @IsEnum(Role, { message: 'El rol debe ser ADMIN, USER o MANAGER' })
  role: Role;
}
