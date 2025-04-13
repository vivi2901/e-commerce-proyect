import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product, Prisma } from 'generated/prisma';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async findAll(params: {
    page: number;
    limit: number;
    search?: string;
  }) {
    const { page, limit, search } = params;

    const where: any = {};

    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit === 0 ? undefined : limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id '${id}' not found`);
    }

    return product;
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Product with id '${id}' not found`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Product with id '${id}' not found`);
      }
      throw error;
    }
  }

  async getAvailableQuantity(productId: string): Promise<number> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: { quantity: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with id '${productId}' not found`);
    }

    return product.quantity;
  }
}
