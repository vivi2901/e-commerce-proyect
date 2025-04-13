import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ required: true})
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'The e-mail is invalid' })
  email: string;

  @ApiProperty({ required: true})
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
