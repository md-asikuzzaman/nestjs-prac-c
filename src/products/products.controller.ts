import {
  Controller,
  Get,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';

// products/new-arrivals?sort_by=rand&limit=20&show_stock_out=false

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/new-arrivals')
  newArrival(
    @Query('sort_by') sort_by: string,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('show_stock_out', ParseBoolPipe) show_stock_out: boolean,
  ) {
    return this.productsService.getNewArrivals(sort_by, limit, show_stock_out);
  }
}
