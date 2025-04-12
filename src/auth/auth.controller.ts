import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() data: LoginDto) {
    const userToken = await this.authService.validateUser(data);

    if (!userToken)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return userToken;
  }

  @Public()
  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
