import { Injectable } from '@nestjs/common';

@Injectable()
export class BrandsService {
  private brands = [
    { id: 1, name: 'Brand A', featured: true },
    { id: 2, name: 'Brand B', featured: false },
    { id: 3, name: 'Brand C', featured: true },
    { id: 4, name: 'Brand D', featured: false },
    { id: 5, name: 'Brand E', featured: true },
  ];

  getAllBrands() {
    return this.brands;
  }

  getFeaturedBrands() {
    return this.brands.filter((brand) => brand.featured);
  }
}
