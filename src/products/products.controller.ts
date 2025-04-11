import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by id' })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by id' })
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Get(':id/quantity')
  async getAvailableQuantity(@Param('id') id: string): Promise<number> {
    try {
      return await this.productsService.getAvailableQuantity(id);
    } catch (error) {
      throw new NotFoundException('Producto no encontrado');
    }
  }
}
