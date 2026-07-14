import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [
    { id: 1, name: 'Product A', stock: 10 },
    { id: 2, name: 'Product B', stock: 0 },
    { id: 3, name: 'Product C', stock: 5 },
    { id: 4, name: 'Product D', stock: 0 },
    { id: 5, name: 'Product E', stock: 20 },
  ];

  getAllProducts() {
    if (!this.products.length) {
      throw new NotFoundException('No products found');
    }

    return this.products;
  }

  getNewArrivals(
    sort_by: string,
    limit: number,
    show_stock_out: boolean,
  ) {
    if (limit <= 0) {
      throw new BadRequestException(
        'Limit must be greater than 0',
      );
    }

    const allowedSorts = ['rand'];

    if (sort_by && !allowedSorts.includes(sort_by)) {
      throw new BadRequestException(
        `Invalid sort_by value: ${sort_by}`,
      );
    }

    let filteredProducts = [...this.products];

    if (!show_stock_out) {
      filteredProducts = filteredProducts.filter(
        (product) => product.stock > 0,
      );
    }

    if (!filteredProducts.length) {
      throw new NotFoundException(
        'No products available',
      );
    }

    if (sort_by === 'rand') {
      filteredProducts.sort(() => Math.random() - 0.5);
    }

    return filteredProducts.slice(0, limit);
  }
}