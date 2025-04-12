import { Injectable } from '@nestjs/common';
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
  

  async findOne(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async getAvailableQuantity(productId: string): Promise<number> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: { quantity: true },
    });

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product.quantity;
  }
}
