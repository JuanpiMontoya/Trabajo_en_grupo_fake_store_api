import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiurl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiurl);
  }

  fetchProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiurl}/${id}`);
  }

  fetchProductByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiurl}/category/${category}`);
  }

  fetchCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiurl}/categories`);
  }
}