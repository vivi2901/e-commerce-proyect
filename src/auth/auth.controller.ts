import { Controller, Post, Body, HttpStatus, HttpException, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginDto) {
    const userToken = await this.authService.validateUser(data);

    if (!userToken)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return userToken;
  }

  @Public()
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Validation error: invalid input.' })
  @ApiResponse({ status: 409, description: 'Email already exists.' })
  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
