import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  //Login
  async validateUser(user: LoginDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
  
    if (!foundUser || foundUser.password !== user.password) {
      throw new HttpException('Invalid email or password', HttpStatus.BAD_REQUEST);
    }    
  
    return this.jwtService.sign({
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    });
  }

  // Register user 
  async register(data: RegisterDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
  
    if (userExists) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }
  
    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: 'USER',
      },
    });
  
    const token = this.jwtService.sign({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });
  
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      access_token: token,
    };
  }
}
