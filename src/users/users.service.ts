import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(`The email '${createUserDto.email}' is already in use`);
      }
      throw error; 
    }
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found`);
    }

    return user;
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id '${id}' not found`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id '${id}' not found`);
      }
      throw error;
    }
  }
}
