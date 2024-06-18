import { Injectable } from '@angular/core';
import { Product } from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiurl = 'http://localhost:3000/carts'; // URL del API backend

  constructor() {}

  async agregarAlCarrito(producto: Product) {
    try {
      const productoExistente = await this.buscarProductoEnCarrito(producto.id);
      if (productoExistente) {
        productoExistente.quantity = (productoExistente.quantity || 0) + (producto.quantity || 1);
        await this.actualizarProductoEnCarrito(productoExistente);
      } else {
        const response = await fetch(this.apiurl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...producto, quantity: producto.quantity || 1 })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to add product to cart: ${errorText}`);
        }
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  }


  async vaciarCarrito() {
    await fetch(this.apiurl, {
      method: 'DELETE'
    });
  }

  async getProductos(): Promise<Product[]> {
    const resp = await fetch(this.apiurl);
    if (!resp.ok) {
      throw new Error('Failed to fetch cart products');
    }
    return await resp.json();
  }

  async getTotal(): Promise<number> {
    const productos = await this.getProductos();
    return productos.reduce((total, producto) => total + (producto.price * (producto.quantity || 1)), 0);
  }

  async actualizarProductoEnCarrito(producto: Product) {
    await fetch(`${this.apiurl}/${producto.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    });
  }

  private async buscarProductoEnCarrito(id: number): Promise<Product | undefined> {
    const productos = await this.getProductos();
    return productos.find(p => p.id === id);
  }
}
