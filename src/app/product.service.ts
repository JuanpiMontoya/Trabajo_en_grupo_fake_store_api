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
}
