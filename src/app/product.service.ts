import { Injectable } from '@angular/core';
import { Product } from './interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiurl = 'https://fakestoreapi.com/products/';

  constructor() { }

  async fetchProducts(): Promise<Product[]>{
    const resp = await fetch(this.apiurl);
    const products = await resp.json();
    return products;
  }

  async fetchProductById(id: number): Promise<Product> {
    const resp = await fetch(`${this.apiurl}${id}`);
    if (!resp.ok) {
      throw new Error('Product not found');
    }
    const product = await resp.json();
    return product;
  }
}
